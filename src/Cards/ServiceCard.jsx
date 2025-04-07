import PropTypes from "prop-types";
import { Edit, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDeleteServiceMutation } from "../api/serviceApi";
import UpdateService from "../components/services/UpdateService";
import { useState } from "react";
import ServiceImage from "../components/services/ServiceImage";
function ServiceCard({ service = {} }) {
  const [deleteService, { isLoading }] = useDeleteServiceMutation();
  const [isEditOpen, setIsEditOpen] = useState(false);

  if (!service || Object.keys(service).length === 0) {
    return (
      <div className="bg-white shadow-md rounded-md p-6">
        <p className="text-red-500">Service data not available</p>
      </div>
    );
  }
  const handleEdit = () => {
    console.log("Edit button clicked");
    //pop -up edit service form
    setIsEditOpen(true);
  };
  const handleDelete = async () => {
    console.log("Delete button clicked");
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your service? This action is irreversible!"
    );

    if (confirmDelete) {
      try {
        // Call API to delete user (assuming you have `useDeleteUserMutation` hook)
        const response = await deleteService(service.serviceId).unwrap();
        console.log("Service deleted successfully:", response);
        toast.success("Your service has been deleted successfully!");
      } catch (error) {
        console.error("Error deleting profile:", error);
        toast.error("Failed to delete profile. Please try again.");
      }
    }
  };
  return (
    <div>
      <ServiceImage
        imageName={service.imageUrl}
        alt={service.serviceName}
        className="w-full h-40 object-cover rounded-md mb-4 transition-all duration-300 hover:scale-110"
      />

      <h3 className="text-xl font-bold text-gray-800">
        {service.serviceName || "Unnamed Service"}
      </h3>
      <p className="text-gray-500 text-sm font-semibold">
        {service.description || "No description available"}
      </p>
      <p className="text-gray-800 font-semibold mt-2">
        Category:{" "}
        <span className="text-gray-500">
          {service.category || "Uncategorized"}
        </span>
      </p>
      <p className="text-gray-800 font-semibold mt-1">
        Price:{" "}
        <span className="text-gray-500">
          {service.price ? `₹${service.price}` : "Not specified"}
        </span>
      </p>
      <p className="text-gray-800 text-sm font-semibold">
        Duration:{" "}
        <span className="text-gray-500">
          {service.expectedDuration
            ? `${service.expectedDuration} minutes`
            : "Not specified"}
        </span>
      </p>
      <p className="text-gray-800 font-semibold mt-1">
        Comapny Name:{" "}
        <span className="text-gray-500">
          {service.serviceProviderName
            ? `${service.serviceProviderName}`
            : "Unknown provider"}
        </span>
      </p>
      <p
        className={`text-sm font-semibold mt-2 ${
          service.status ? "text-green-600" : "text-red-600"
        }`}
      >
        {service.status ? "Available" : "Unavailable"}
      </p>
      <p className="text-gray-800 text-xs mt-2 font-semibold">
        Created:{" "}
        <span className="text-gray-500">{service.createdAt || "N/A"}</span>
      </p>
      <p className="text-gray-800 text-xs font-semibold">
        Updated:{" "}
        <span className="text-gray-500">{service.updatedAt || "N/A"}</span>
      </p>
      <div className="flex space-x-3 mt-3 ">
        <button
          onClick={handleEdit}
          className="flex items-center space-x-1 px-3 py-1 bg-blue-500 text-white 
                                              rounded-md hover:bg-blue-600 transition cursor-pointer"
        >
          <Edit className="w-4 h-4 " />
          <span>Edit</span>
        </button>
        {isEditOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
            <UpdateService
              service={service}
              onClose={() => setIsEditOpen(false)}
            />
          </div>
        )}

        <button
          onClick={handleDelete}
          className="flex items-center space-x-1 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}

ServiceCard.propTypes = {
  service: PropTypes.shape({
    image_url: PropTypes.string,
    serviceName: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    expectedDuration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    serviceProvider: PropTypes.shape({
      companyName: PropTypes.string,
    }),
    status: PropTypes.bool,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }),
};

export default ServiceCard;
