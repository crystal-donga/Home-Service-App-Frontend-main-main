const ServiceCard = (services, error ) => {
    return (
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Admin Services</h2>
  
        {error && <p className="text-red-500 text-lg">{error}</p>}
  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.length > 0 ? (
            services.map((service) => (
              <div key={service.id} className="bg-white shadow-lg rounded-lg p-4">
                <h3 className="text-xl font-semibold text-gray-700">{service.name}</h3>
                <p className="text-gray-600 mt-2">{service.description}</p>
                {service.image && (
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-40 object-cover rounded mt-3"
                  />
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-lg">No services available.</p>
          )}
        </div>
      </div>
    );
  };
  
  export default ServiceCard;
  