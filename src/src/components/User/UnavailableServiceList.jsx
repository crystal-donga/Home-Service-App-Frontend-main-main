import { X } from "lucide-react";
import ServiceImage from "../services/ServiceImage";
import PropTypes from "prop-types";

const UnavailableServiceList = ({ services, onRemove }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2 text-red-600">
        Unavailable Services
      </h3>
      <div className="grid grid-cols-1 gap-6">
        {services.map((service) => (
          <div
            key={service.serviceId}
            className="bg-white rounded-xl shadow-md p-6 relative grid grid-cols-1 sm:grid-cols-5 gap-4 items-center opacity-60"
          >
            <button
              onClick={() => onRemove(service.serviceId)}
              className="absolute top-2 right-2 text-black hover:text-red-600 cursor-pointer"
              title="Remove from Cart"
            >
              <X size={20} />
            </button>

            <div className="col-span-1">
              <ServiceImage
                imageName={service.imageUrl}
                alt={service.serviceName}
                className="w-full h-24 object-cover rounded-md"
              />
            </div>

            <div className="col-span-4 grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-semibold text-gray-700">Service Name</p>
                <p className="text-gray-600">{service.serviceName}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Category</p>
                <p className="text-gray-600">{service.category}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Price</p>
                <p className="text-gray-600">₹{service.price}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Duration</p>
                <p className="text-gray-600">{service.expectedDuration} mins</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Company</p>
                <p className="text-gray-600">{service.serviceProviderName}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Status</p>
                <p className="text-red-600">Unavailable</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Prop validation
UnavailableServiceList.propTypes = {
  services: PropTypes.arrayOf(
    PropTypes.shape({
      serviceId: PropTypes.string.isRequired,
      serviceName: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      expectedDuration: PropTypes.number.isRequired,
      serviceProviderName: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      status: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default UnavailableServiceList;
