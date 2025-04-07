
import { useGetAllQuery } from "../api/serviceApi"
import AllServiceCard from "../Cards/AllServiceCard";
const Services = () => {
  const{data:services,isLoading, isError} = useGetAllQuery();
  console.log("services",services)
  if (isLoading) {
    return (
      <div className="bg-gray-100 min-h-screen p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">View All Services</h1>
        <div className="text-center text-2xl p-6">
          <div className="animate-spin inline-block w-8 h-8 border-t-2 border-b-2 border-gray-500 rounded-full"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-gray-100 min-h-screen p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">View All Services</h1>
        <p className="text-center text-red-500">Failed to load services. Try again later.</p>
      </div>
    );
  } 
  return (
    
      <div className="bg-gray-100 min-h-screen p-2">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">View All Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services?.map((service) => (
            <div 
              key={service.id} 
              className="bg-gray-300 p-6  hover:rounded-md 
                          cursor-pointer"
            >
              <AllServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
    );
}

export default Services