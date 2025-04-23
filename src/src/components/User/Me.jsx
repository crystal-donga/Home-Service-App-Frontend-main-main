import  { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode
import { useGetUserDetailsQuery, useDeleteUserMutation } from "../../api/userApi";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import UserImage from "./UserImage";
import { FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiEdit, FiTrash2 } from "react-icons/fi";

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

        removeCookie("authToken", { path: "/" });
        localStorage.removeItem("user");

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-5xl rounded-3xl bg-white/30 backdrop-blur-md border border-black/60 shadow-2xl p-10 sm:p-16 mt-10">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 text-center mb-12 tracking-tight">
          <span className="bg-gradient-to-r from-indigo-600 to-blue-400 bg-clip-text text-transparent">
            Welcome, {userDetails?.name?.split(" ")[0] || "User"}
          </span>
          <span className="text-gray-800"> 👋</span>
        </h2>


        {userDetails ? (
          <div className="flex flex-col items-center space-y-12">
            {/* Profile Picture */}
            <div className="relative">
              <UserImage
                imageName={userDetails.profilePictureUrl}
                alt={userDetails.name}
                className="w-44 h-44 rounded-full border-4 border-indigo-500 shadow-xl object-cover transition-transform duration-300 hover:scale-105"
              />
              <span className="absolute bottom-2 right-2 bg-gradient-to-tr from-blue-500 to-indigo-500 text-white px-3 py-1 text-xs rounded-full shadow">
                {userDetails.role || "User"}
              </span>
            </div>


            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {[
                ["Full Name", userDetails.name, FiUser ],
                ["Email", userDetails.email, FiMail ],
                ["Phone Number", userDetails.phoneNumber, FiPhone ],
                ["Date of Birth", userDetails.dateOfBirth, FiCalendar ],
                ["Address", userDetails.address, FiMapPin ],
                ["City", userDetails.city, FiMapPin ],
                ["State", userDetails.state, FiMapPin ],
                ["Country", userDetails.country, FiMapPin ],
                ["Zip Code", userDetails.zipCode, FiMapPin ],
              ].map(([label, value, icon], idx) => (
                <div
                  key={idx}
                  className="bg-white/70 border border-gray-200 rounded-xl p-5 backdrop-blur-md shadow-lg hover:shadow-xl transition-all flex items-start "
                >
                  <div className="text-xl text-indigo-600">{icon}</div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
                    <p className="text-lg font-semibold text-gray-800 break-words">
                      {value || "—"}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap justify-center gap-6 pt-8">
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold shadow-lg hover:scale-105 hover:from-indigo-600 hover:to-blue-600 transition-all"
              >
                <FiEdit className="text-lg" />
                Edit Profile
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 hover:from-red-600 hover:to-pink-600 transition-all"
              >
                <FiTrash2 className="text-lg" />
                Delete Profile
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-600 text-lg">No profile found. Please create one.</p>
            <Link
              to="/user-details"
              className="inline-block mt-4 text-blue-600 font-semibold hover:underline"
            >
              ➕ Add Profile
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Me;