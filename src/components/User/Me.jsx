import React, { useEffect, useState } from "react";
<<<<<<< HEAD
//import Cookies from "js-cookie";
import { useCookies } from "react-cookie"; 
import { jwtDecode } from "jwt-decode"; // Import jwt-decode
import { useGetUserDetailsQuery ,useDeleteUserMutation  } from "../../api/userApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import UserImage from "./UserImage";
=======
import { useCookies } from "react-cookie"; // react-cookie hook
import { jwtDecode } from "jwt-decode";
import { useGetUserDetailsQuery, useDeleteUserMutation } from "../../api/userApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
>>>>>>> a46e343357c35832d1216f0d119589e8f432de23

function Me() {
  const [cookies, setCookie, removeCookie] = useCookies(["authToken"]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const [deleteUser] = useDeleteUserMutation();

  const { data: userDetails, error: detailsError, isLoading: detailsLoading } =
    useGetUserDetailsQuery(userId, {
      skip: !userId,
    });

  useEffect(() => {
    const token = cookies.authToken;
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded JWT:", decoded);
        if (!decoded.userId) {
          toast.error("User Not Found");
        } else {
          setUserId(decoded.userId);
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
  }, [cookies]);

  const handleEdit = () => {
    navigate("/user-profile-update");
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your profile? This action is irreversible!"
    );

    if (confirmDelete) {
      try {
        const response = await deleteUser(userDetails).unwrap();
        console.log("User deleted successfully:", response);
<<<<<<< HEAD
  
       
        // Remove auth token from cookies
        removeCookie("authToken", { path: "/" });
        // Clear local storage
        localStorage.removeItem("user");
  
        // Show success message
=======

        // Remove auth token from cookies
        removeCookie("authToken", { path: "/" });

>>>>>>> a46e343357c35832d1216f0d119589e8f432de23
        toast.success("Your profile has been deleted successfully!");
        navigate("/login");
      } catch (error) {
        console.error("Error deleting profile:", error);
        toast.error("Failed to delete profile. Please try again.");
      }
    }
  };

  if (detailsLoading) {
    return (
      <div className="text-center text-blue-500 text-lg font-semibold">
        Loading...
      </div>
    );
  }

<<<<<<< HEAD
  // if(detailsError){
  //   return <div className="text-center text-red-500 text-lg font-semibold">Error</div>
  //   };

  
  console.log("Merged User Data:", userDetails);
 //  console.log(userDetails.profilePictureUrl);
=======
>>>>>>> a46e343357c35832d1216f0d119589e8f432de23
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10 border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        My Profile
      </h2>

      {userDetails ? (
        <div className="flex flex-col items-center">
<<<<<<< HEAD
          {/* Profile Picture */}
          <UserImage
            imageName={userDetails.profilePictureUrl} 
            alt={userDetails.name}
            className="w-40 h-40 rounded-full border-4 border-gray-300 shadow-md object-cover"
          />
=======
          {/* Profile picture or default SVG */}
          <div className="w-40 h-40 rounded-full border-4 border-gray-300 shadow-md overflow-hidden">
            {/* SVG avatar here (unchanged) */}
          </div>
>>>>>>> a46e343357c35832d1216f0d119589e8f432de23

          <div className="mt-6 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p className="text-gray-700 text-lg">
                <span className="font-semibold text-gray-900">Name:</span>{" "}
                {userDetails.name}
              </p>
              <p className="text-gray-700 text-lg">
                <span className="font-semibold text-gray-900">Email:</span>{" "}
                {userDetails.email}
              </p>
              <p className="text-gray-700 text-lg">
                <span className="font-semibold text-gray-900">Phone:</span>{" "}
                {userDetails.phoneNumber}
              </p>
<<<<<<< HEAD
              {/* <p className="text-gray-700 text-lg">
                <span className="font-semibold text-gray-900">Role:</span> {userDetails.role}
              </p> */}
=======
              <p className="text-gray-700 text-lg">
                <span className="font-semibold text-gray-900">Role:</span>{" "}
                {userDetails.role}
              </p>
>>>>>>> a46e343357c35832d1216f0d119589e8f432de23
              <p className="text-gray-700 text-lg">
                <span className="font-semibold text-gray-900">
                  Date of Birth:
                </span>{" "}
                {userDetails.dateOfBirth}
              </p>
              <p className="text-gray-700 text-lg">
                <span className="font-semibold text-gray-900">Address:</span>{" "}
                {userDetails.address}
              </p>
              <p className="text-gray-700 text-lg">
                <span className="font-semibold text-gray-900">City:</span>{" "}
                {userDetails.city}
              </p>
              <p className="text-gray-700 text-lg">
                <span className="font-semibold text-gray-900">State:</span>{" "}
                {userDetails.state}
              </p>
              <p className="text-gray-700 text-lg">
                <span className="font-semibold text-gray-900">Country:</span>{" "}
                {userDetails.country}
              </p>
              <p className="text-gray-700 text-lg">
                <span className="font-semibold text-gray-900">Zip Code:</span>{" "}
                {userDetails.zipCode}
              </p>
            </div>

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
        <p className="text-center text-gray-500 text-lg">No Profile Data</p>
      )}
    </div>
  );
}

export default Me;
