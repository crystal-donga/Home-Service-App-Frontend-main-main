import React from "react";

export default function ServiceCard( services ) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {services.map((service) => (
        <div
          key={service.id}
          className="bg-white shadow-lg rounded-lg overflow-hidden p-4"
        >
          {/* Service Image */}
          {service.image_url && (
            <img
            src={service.image_url ? `http://localhost:8080/api/services/image/${service.image_url}` 
            : "https://via.placeholder.com/150"}
              alt={service.serviceName}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
          )}
          
          {/* Service Details */}
          <h3 className="text-xl font-bold text-gray-800">
            {service.serviceName}
          </h3>
          <p className="text-gray-600 text-sm">{service.description}</p>
          <p className="text-gray-700 font-semibold mt-2">
            Category: <span className="text-gray-500">{service.category}</span>
          </p>
          <p className="text-blue-600 font-semibold mt-1">
            Price: ${service.price}
          </p>
          <p className="text-gray-500 text-sm">
            Duration: {service.expectedDuration} min
          </p>
          <p className="text-gray-700 font-semibold mt-1">
            Provider: {service.serviceProvider?.companyName || "Unknown"}
          </p>
          <p className={`text-sm font-semibold mt-2 ${service.status ? "text-green-600" : "text-red-600"}`}>
            {service.status ? "Available" : "Unavailable"}
          </p>
          <p className="text-gray-400 text-xs mt-2">
            Created: {new Date(service.createdAt).toLocaleDateString()}
          </p>
          <p className="text-gray-400 text-xs">
            Updated: {new Date(service.updatedAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
