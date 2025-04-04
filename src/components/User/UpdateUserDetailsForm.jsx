import React,{useState,useEffect}from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useUpdateUserDetailsMutation ,useGetUserDetailsQuery} from "../../api/userApi";

 function UpdateUserDetailsForm() {
    const [formData, setFormData] = useState({
      userId: "", // Ensure userId is included
      address: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
      dateOfBirth: "",
      profilePictureUrl: null,
     
      
    });
     
      const [imagePreview, setImagePreview] = useState(null);
      const [updateUserDetails,refetch ] = useUpdateUserDetailsMutation();
      const navigate = useNavigate();

        useEffect(() => {
          const token = Cookies.get("authToken");
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
        }, []);
        
        // Fetch user details from API
   const { data: existingUserDetails, isLoading } = useGetUserDetailsQuery(formData.userId, {
    skip: !formData.userId,
  });
        // Populate form with existing user details
useEffect(() => {
  if (existingUserDetails) {
    setFormData((prev) => ({
      ...prev,
      ...existingUserDetails,
      profilePictureUrl: existingUserDetails.profilePictureUrl || prev.profilePictureUrl,
        
    
    }));
    if (existingUserDetails.profilePictureUrl) {
      setImagePreview(`http://localhost:8080/api/user-details/image/${existingUserDetails.profilePictureUrl}`);
    }
  }
}, [existingUserDetails]);
        const handleChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
          };

           const handleImageChange = (e) => {
              const file = e.target.files[0];
              if (file) {
                // if (!file.type.startsWith("image/")) {
                //   toast.error("Please select a valid image file!");
                //   return;
                // }
                 setFormData({ ...formData, profilePictureUrl: file || "",}) // Ensure it's a string });
          
                // Image preview
                const reader = new FileReader();
                reader.onloadend = () => {
                    //setFormData({ ...formData, profilePictureUrl: reader.result }); 
                    setImagePreview(reader.result);
                 
                };
                reader.readAsDataURL(file);
              }
            };

             const handleSubmit = async (e) => {
                e.preventDefault();
                const updateUserDetailsBlob = new Blob([JSON.stringify({
                  userId: formData.userId,
                  address: formData.address,
                  city: formData.city,
                  state: formData.state,
                  country: formData.country,
                  zipCode: formData.zipCode,
                  dateOfBirth: formData.dateOfBirth
              })], { type: 'application/json' });
              
              const formDataToSend = new FormData();
            
              formDataToSend.append("UserDetailsRegisterDto",updateUserDetailsBlob);
              if (formData.profilePictureUrl) {
                formDataToSend.append("imageFile", formData.profilePictureUrl);
            } else {
                console.warn("No image selected");
            }
              
              for (let pair of formDataToSend.entries()) {
                console.log(pair[0], pair[1]);
              }
                try {
                  console.log(formDataToSend)
                  const response = await updateUserDetails(formDataToSend).unwrap();
                  console.log("response",response)
                  toast.success("User details updated successfully!");
                  navigate("/me")
                  
                  
                } catch (error) {
                  toast.error(error?.data?.message || "Failed to submit user details.");
                }
              };

  return (
     <div className="max-w-lg mx-auto mt-4 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Update User Details Form</h2>

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
          
          </div>
        ))}

        {/* Profile Picture Upload */}
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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  )
}
export default UpdateUserDetailsForm
