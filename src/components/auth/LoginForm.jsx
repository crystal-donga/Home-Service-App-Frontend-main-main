import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Input from "../common/Input";
import Button from "../common/Button";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "User", // Default role
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const roleColors = {
    User: "bg-blue-100",
    PROVIDER: "bg-green-100",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit button clicked");

    if (!validate()) {
      //console.log("Validation failed", errors);
      return;
    }

    setIsLoading(true);
    //console.log("Sending request to backend...");

    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        email: formData.email,
        password: formData.password,
        role: formData.role.toUpperCase(), // Convert role to uppercase
      });
      //console.log(formData.role)
      console.log("Login successful", response.data);
      
      // Extract token from response
      //const token = response.data.token.split('=')[1].split(';')[0];  // Extract JWT only

      const token = response.data.token
      // Store token in cookies for 7 days
      Cookies.set("authToken", token, { expires: 7, secure: true, sameSite: "Lax", path: "/" });

      //  Store JWT token in cookies
      //console.log("authToken",response.data);
      // Cookies.set("authToken", response.data, { expires: 7 });
       
      // Store user info in localStorage
      localStorage.setItem("user", JSON.stringify(response.data));
      
      
      console.log("formdata role",formData.role);
     
      console.log(formData.role);
      if(formData.role=='User'){
        navigate("/services");
      }else{
      navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data);
      setErrors({
        form: error.response?.data?.message || "Login failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`p-6 rounded-lg shadow-lg ${roleColors[formData.role] || "bg-white"}`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.form && (
          <div className="p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
            <p>{errors.form}</p>
          </div>
        )}

        <Input
          label="Email address"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />

        <div>
          <label className="block text-gray-700 font-medium mb-1">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
           <option value="User">User</option>
           <option value="PROVIDER">SERVICEPROVIDER</option>
          </select>
        </div>

        <Button type="submit" fullWidth isLoading={isLoading}>
          Sign in
        </Button>
      </form>
      <div className="text-center mt-2">
        <p className="text-sm text-gray-600">
          Not Registered?{" "}
          <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;