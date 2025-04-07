import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCreateUserDetailsMutation } from "../../api/userApi";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
const UserDetailsForm = () => {
  const [cookies] = useCookies(["authToken"]);
  const [formData, setFormData] = useState({
    userId: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    dateOfBirth: "",
    profilePictureUrl: null,
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [createUserDetails] = useCreateUserDetailsMutation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = cookies.authToken;
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (!decoded.userId) {
          console.error("User ID not found in token!");
          return;
        }
        setFormData((prev) => ({ ...prev, userId: decoded.userId }));
      } catch (error) {
        console.log("Invalid token");
      }
    }
  }, [cookies]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilePictureUrl: file });

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.zipCode) newErrors.zipCode = "Zip Code is required";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of Birth is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const userDetailsBlob = new Blob(
      [
        JSON.stringify({
          userId: formData.userId,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          zipCode: formData.zipCode,
          dateOfBirth: formData.dateOfBirth,
        }),
      ],
      { type: "application/json" }
    );

    const formDataToSend = new FormData();
    formDataToSend.append("UserDetailsRegisterDto", userDetailsBlob);

    if (formData.profilePictureUrl) {
      formDataToSend.append("imageFile", formData.profilePictureUrl);
    } else {
      console.warn("No image selected");
    }

    try {
      await createUserDetails(formDataToSend).unwrap();
      toast.success("User details submitted successfully!");
      navigate("/me");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to submit user details.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-4 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">User Details Form</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { name: "address", label: "Address" },
          { name: "city", label: "City" },
          { name: "state", label: "State" },
          { name: "country", label: "Country" },
          { name: "zipCode", label: "Zip Code" },
          { name: "dateOfBirth", label: "Date of Birth", type: "date" },
        ].map(({ name, label, type = "text" }) => (
          <div key={name}>
            <label className="block text-gray-700 font-medium">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
            {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
          </div>
        ))}

        <div>
          <label className="block text-gray-700 font-medium">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.profilePictureUrl && <p className="text-red-500 text-sm">{errors.profilePictureUrl}</p>}
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Profile Preview"
              className="mt-2 w-32 h-32 rounded-full object-cover border"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserDetailsForm;
