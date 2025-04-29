
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useGetProviderDetailsQuery, useDeleteProviderDetailsMutation } from "../../api/providerApi";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";
import ProviderImage from "./ProviderImage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetAllServicesQuery } from "../../api/serviceApi";
import Sidebar from "../../Sidebar";
import { FiUser, FiMail, FiPhone, FiMapPin, FiBriefcase, FiCalendar, FiDelete } from "react-icons/fi";

const ProviderProfile = () => {
  useEffect(()=>{
          document.title="Provider Profile"
      })
  const [cookies, , removeCookie] = useCookies(["authToken"]);
  const [userId, setUserId] = useState();
  const [serviceProviderId, setServiceProviderId] = useState();
  const navigate = useNavigate();
  const [deleteProviderDetails] = useDeleteProviderDetailsMutation();

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

  const { data: services } = useGetAllServicesQuery(serviceProviderId, {
    skip: !serviceProviderId,
  });

  const handleEdit = () => {
    navigate("/provider-profile-update");
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your profile? This action is irreversible!");

    if (confirmDelete) {
      try {
        if (services && services.length > 0) {
          toast.warning("You have active services, you cannot delete your profile");
          navigate("/view-services");
          return;
        }

        const response = await deleteProviderDetails({ serviceProviderId }).unwrap();
        console.log("provider deleted successfully:", response);

        removeCookie("authToken");
        localStorage.removeItem("user");

        toast.success("Your profile has been deleted successfully!");
        navigate("/login");
      } catch (error) {
        console.error("Error deleting profile:", error);
        toast.error("Failed to delete profile. Please try again.");
      }
    }
  };

  const { data: provider, error, isLoading } = useGetProviderDetailsQuery(userId, {
    skip: !userId,
  });

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100">
      {/* <Sidebar /> */}

      <main className="flex-1 p-6 mt-18 w-full">
        <div className="max-w-5xl mx-auto bg-white/30 backdrop-blur-md border border-black/60 shadow-2xl p-10 sm:p-16 rounded-3xl">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 text-center mb-12 tracking-tight">
            <span className="bg-gradient-to-r from-indigo-600 to-blue-400 bg-clip-text text-transparent">
              Welcome, {provider?.userName || "Provider"}
            </span>
            <span className="text-gray-800"> 👋</span>
          </h2>

          {provider ? (
            <div className="flex flex-col items-center space-y-12">
              {/* Profile Image */}
              <div className="relative">
                <ProviderImage
                  imageName={provider.imageUrl}
                  alt={provider.userName}
                  className="w-44 h-44 rounded-full border-4 border-indigo-500 shadow-xl object-cover transition-transform duration-300 hover:scale-105"
                />
                <span className="absolute bottom-2 right-2 bg-gradient-to-tr from-blue-500 to-indigo-500 text-white px-3 py-1 text-xs rounded-full shadow">
                  {provider.role || "Provider"}
                </span>
              </div>

              {/* Profile Information Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {[
                  ["Name", provider.userName, FiUser ],
                  ["Email", provider.email,FiMail ],
                  ["Company Name", provider.companyName, FiBriefcase ],
                  ["Company Number", provider.companyNumber, FiPhone ],
                  ["Role", provider.role, FiBriefcase ],
                  ["Experience", `${provider.experienceYears} years`, FiCalendar ],
                  ["Address", provider.address, FiMapPin ],
                  ["Joining Date", provider.joiningDate, FiCalendar ],
                ].map(([label, value, icon], idx) => (
                  <div
                    key={idx}
                    className="bg-white/70 border border-gray-200 rounded-xl p-5 backdrop-blur-md shadow-lg hover:shadow-xl transition-all flex items-start gap-4"
                  >
                    <div className="text-xl text-indigo-600">{icon}</div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
                      <p className="text-lg font-semibold text-gray-800 break-words">{value || "—"}</p>
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
                  Edit Profile
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 hover:from-red-600 hover:to-pink-600 transition-all"
                >
                  <FiDelete className="text-lg" />
                  Delete Profile
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-600 text-lg">No profile found. Please create one.</p>
              <Link
                to="/provider-details/register"
                className="inline-block mt-4 text-blue-600 font-semibold hover:underline"
              >
                ➕ Add Profile
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProviderProfile;