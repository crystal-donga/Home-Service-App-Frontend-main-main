import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie"; // ✅ REACT COOKIE
import "react-toastify/dist/ReactToastify.css";
import { useCreateProviderMutation } from "../../api/providerApi.jsx";

const ProviderDetails = () => {
  const navigate = useNavigate();
  const [createProvider, { isLoading }, error] = useCreateProviderMutation();

  const [cookies, setCookie] = useCookies(["authToken"]); // ✅

  const [formData, setFormData] = useState({
    userId: "",
    companyName: "",
    companyNumber: "",
    experienceYears: "",
    address: "",
    imageUrl: "",
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
      const token = cookies.authToken;
    if (token) {
      try {
        const decode = jwtDecode(token);
        if (!decode.userId) {
          console.error("User ID not found in token!");
          return;
        }
        setFormData((prev) => ({ ...prev, userId: decode.userId }));
      } catch (error) {
        console.log("Invalid token");
      }
    }
  }, [cookies]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, imageUrl: file });

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.companyName ||
      !formData.companyNumber ||
      !formData.experienceYears ||
      !formData.address
    ) {
      toast.error("Please fill out all fields!");
      return;
    }

    const providerDetailsBlob = new Blob(
      [
        JSON.stringify({
          userId: formData.userId,
          companyName: formData.companyName,
          companyNumber: formData.companyNumber,
          experienceYears: formData.experienceYears,
          address: formData.address,
        }),
      ],
      { type: "application/json" }
    );

    const formDataToSend = new FormData();
    formDataToSend.append("ServiceProviderRegisterDto", providerDetailsBlob);

    if (formData.imageUrl) {
      formDataToSend.append("imageFile", formData.imageUrl);
    } else {
      console.warn("No image selected");
    }

    try {
      const response = await createProvider(formDataToSend).unwrap();

      if (response?.token) {
        setCookie("authToken", response.token, { path: "/", maxAge: 7 * 24 * 60 * 60, sameSite: "Lax", secure: false }); // 7 days
        console.log("Token stored in cookies.");
      }

      toast.success("Provider added successfully!");

      setTimeout(() => {
        navigate("/provider-profile");
      }, 2000);
    } catch (error) {
      console.error("Error saving provider details:", error);
      const errorMessage =
        error?.data?.error || "Failed to add provider. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Provider Details</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Company Name</label>
          <input
            type="text"
            name="companyName"
            placeholder="Enter company name"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Company Number</label>
          <input
            type="number"
            name="companyNumber"
            placeholder="Enter company number"
            value={formData.companyNumber}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Years of Experience</label>
          <input
            type="number"
            name="experienceYears"
            placeholder="Enter experience years"
            value={formData.experienceYears}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Address</label>
          <textarea
            name="address"
            placeholder="Enter address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            rows="3"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
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
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ProviderDetails;
