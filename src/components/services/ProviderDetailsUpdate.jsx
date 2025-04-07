import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//import Cookies from "js-cookie";
import { useCookies } from "react-cookie";

import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import {
  useUpdateProviderDetailsMutation,
  useGetProviderDetailsQuery,
} from "../../api/providerApi";

export default function ProviderDetailsUpdate() {
 
  const [serviceProviderId, setServiceProviderId] = useState(null);
  const [cookies] = useCookies(["authToken"]); 
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const [updateProviderDetails, { isLoading }] = useUpdateProviderDetailsMutation();

  useEffect(() => {

    const token = cookies.authToken

    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (!decoded.serviceProviderId || !decoded.userId) {
          console.error("Service provider ID or User ID missing in token!");
          return;
        }
        setServiceProviderId(decoded.serviceProviderId);
        setUserId(decoded.userId);
        setFormData((prev) => ({
          ...prev,
          serviceProviderId: decoded.serviceProviderId,
        }));
      } catch (error) {
        console.error("Invalid token", error);
      }
    }

  

  }, [cookies]);


  const { data: existingProviderDetails, isLoading: isProviderDetailsLoading } =
    useGetProviderDetailsQuery(userId, {
      skip: !userId,
    });

  useEffect(() => {
    if (existingProviderDetails) {
      setFormData({
        serviceProviderId: existingProviderDetails.serviceProviderId,
        companyName: existingProviderDetails.companyName || "",
        experienceYears: existingProviderDetails.experienceYears || "",
        address: existingProviderDetails.address || "",
        companyNumber: existingProviderDetails.companyNumber || "",
        imageUrl: existingProviderDetails.imageUrl || null,
      });

      if (existingProviderDetails.imageUrl) {
        setImagePreview(
          `http://localhost:8080/api/service-providers/image/${existingProviderDetails.imageUrl}`
        );
      }
    }
  }, [existingProviderDetails]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        imageUrl: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) return;

    const providerDetailsBlob = new Blob(
      [
        JSON.stringify({
          serviceProviderId: formData.serviceProviderId,
          companyName: formData.companyName,
          companyNumber: formData.companyNumber,
          experienceYears: formData.experienceYears,
          address: formData.address,
        }),
      ],
      { type: "application/json" }
    );

    const formDataToSend = new FormData();
    formDataToSend.append("ServiceProviderUpdateDto", providerDetailsBlob);

    if (formData.imageUrl instanceof File) {
      formDataToSend.append("imageFile", formData.imageUrl);
    }

    try {
      await updateProviderDetails(formDataToSend).unwrap();
      toast.success("Provider details updated successfully!");
      navigate("/provider-profile");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update provider details.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-4 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">
        Update Provider Details
      </h2>
      {!formData ? (
        <p>Loading provider details...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { name: "companyName", label: "Company Name" },
            { name: "experienceYears", label: "Experience Years" },
            { name: "address", label: "Address" },
            { name: "companyNumber", label: "Company Number" },
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
            </div>
          ))}

          <div>
            <label className="block text-gray-700 font-medium">
              Profile Image
            </label>
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
            disabled={isLoading}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
}
