<<<<<<< HEAD

import  { useEffect, useState } from "react";
//import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode
import { useGetProviderDetailsQuery,useDeleteProviderDetailsMutation } from "../../api/providerApi";
import { useCookies } from "react-cookie";
import { useNavigate ,Link} from "react-router-dom";
import ProviderImage from "./ProviderImage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetAllServicesQuery } from "../../api/serviceApi";
//toast.configure();
 const ProviderProfile = () => {
  const [userId, setUserId] = useState();
  const [serviceProviderId,setServiceProviderId] = useState();
   const navigate = useNavigate()
   const [deleteProviderDetails] = useDeleteProviderDetailsMutation();
   const [cookies, setCookie, removeCookie] = useCookies(["authToken"]); 
   
=======
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"; // ✅ REACT COOKIE
import { jwtDecode } from "jwt-decode";
import { useGetProviderDetailsQuery, useDeleteProviderDetailsMutation } from "../../api/providerApi";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProviderProfile = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["authToken"]); // ✅ Read and remove cookie
  const [userId, setUserId] = useState();
  const [serviceProviderId, setServiceProviderId] = useState();
  const navigate = useNavigate();
  const [deleteProviderDetails] = useDeleteProviderDetailsMutation();

>>>>>>> a46e343357c35832d1216f0d119589e8f432de23
  useEffect(() => {
    const token = cookies.authToken;
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded JWT:", decoded);

        if (!decoded.userId || !decoded.serviceProviderId) {
          console.error("Required IDs not found in token!");
          return;
        }

        setUserId(decoded.userId);
        setServiceProviderId(decoded.serviceProviderId);
      } catch (error) {
        console.error("Invalid Token");
      }
    }
  }, [cookies]);
<<<<<<< HEAD
  const{data:services} = useGetAllServicesQuery(serviceProviderId,{
    skip: !serviceProviderId,
  })
  const handleEdit = () => {
    navigate("/provider-profile-update");
  };
   const handleDelete = async () => {
      const confirmDelete = window.confirm("Are you sure you want to delete your profile? This action is irreversible!");
    
      if (confirmDelete) {
        try {
          //if the provider service exits
          if(services && services.length > 0){
            toast.warning("You have active services, you cannot delete your profile");
            navigate("/view-services");
            return;
          }
          // Call API to delete user (assuming you have `useDeleteUserMutation` hook)
          const response = await deleteProviderDetails({ serviceProviderId: provider.serviceProviderId }).unwrap();
          //const response = await deleteProviderDetails(provider).unwrap();
          console.log("provider deleted successfully:", response);
    
          // Remove auth token from cookies
          removeCookie("authToken");
    
          // Clear local storage
          localStorage.removeItem("user");
    
          // Show success message
          toast.success("Your profile has been deleted successfully!");
    
          // Redirect to login page
          navigate("/login");
        } catch (error) {
          console.error("Error deleting profile:", error);
          toast.error("Failed to delete profile. Please try again.");
        }
=======

  const handleEdit = () => {
    navigate("/provider-profile-update");
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your profile? This action is irreversible!"
    );

    if (confirmDelete) {
      try {
        const response = await deleteProviderDetails({
          serviceProviderId,
        }).unwrap();

        console.log("Provider deleted successfully:", response);

        removeCookie("authToken");

        toast.success("Your profile has been deleted successfully!");
        navigate("/login");
      } catch (error) {
        console.error("Error deleting profile:", error);
        toast.error("Failed to delete profile. Please try again.");
>>>>>>> a46e343357c35832d1216f0d119589e8f432de23
      }
    }
  };

  const { data: provider, error, isLoading } = useGetProviderDetailsQuery(userId, {
    skip: !userId,
  });
<<<<<<< HEAD
  console.log("provider",provider)
 
  //console.log("images",provider.imageUrl)
=======
>>>>>>> a46e343357c35832d1216f0d119589e8f432de23

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">My Profile</h2>
      {provider ? (
        <div className="flex flex-col items-center">
<<<<<<< HEAD
          <ProviderImage
           imageName={provider.imageUrl}
           alt={provider.userName}
           className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-md object-cover"
          
=======
          <img
            src={
              provider.imageUrl
                ? `http://localhost:8080/api/service-providers/image/${provider.imageUrl}`
                : "https://via.placeholder.com/150"
            }
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-md object-cover"
            onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
>>>>>>> a46e343357c35832d1216f0d119589e8f432de23
          />
          <div className="mt-4 w-full">
            <p className="text-gray-700 text-lg">
              <span className="font-medium text-gray-900">Name:</span> {provider.userName}
            </p>
            <p className="text-gray-700 text-lg">
              <span className="font-medium text-gray-900">Email:</span> {provider.email}
            </p>
            <p className="text-gray-700 text-lg">
              <span className="font-medium text-gray-900">Company Name:</span> {provider.companyName}
            </p>
            <p className="text-gray-700 text-lg">
              <span className="font-medium text-gray-900">Company Number:</span> {provider.companyNumber}
            </p>
            <p className="text-gray-700 text-lg">
              <span className="font-medium text-gray-900">Role:</span> {provider.role}
            </p>
            <p className="text-gray-700 text-lg">
              <span className="font-medium text-gray-900">Experience:</span>{" "}
              {provider.experienceYears} years
            </p>
            <p className="text-gray-700 text-lg">
              <span className="font-medium text-gray-900">Address:</span> {provider.address}
            </p>
            <p className="text-gray-700 text-lg">
              <span className="font-medium text-gray-900">Phone:</span> {provider.phoneNumber}
            </p>
            <p className="text-gray-700 text-lg">
              <span className="font-medium text-gray-900">Joining Date:</span> {provider.joiningDate}
            </p>
            {/* Edit & Delete Buttons */}
            <div className="flex space-x-4 mt-6">
              <button
                onClick={handleEdit}
                className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-md shadow hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-4">
          <p className="text-gray-600">No profile found. Please create one.</p>
          <Link
            to="/provider-details/register"
            className="inline-block mt-2 text-blue-600 hover:text-blue-800 transition"
          >
            Add Profile
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProviderProfile;
