import React from "react";
import PropTypes from "prop-types";
import ServiceImage from "../components/services/ServiceImage";
function AllServiceCard({ service = {} }) {
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
    </div>
  );
}
AllServiceCard.propTypes = {
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
  }),
};
export default AllServiceCard;
