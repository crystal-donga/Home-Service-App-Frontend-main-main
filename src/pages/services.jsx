
// import { useGetAllQuery } from "../api/serviceApi"
// import AllServiceCard from "../Cards/AllServiceCard";
// const Services = () => {
//   const{data:services,isLoading, isError,refetch} = useGetAllQuery();
//   console.log("services",services)
//   if (isLoading) {
//     return (
//       <div className="bg-gray-100 min-h-screen p-6">
//         <h1 className="text-2xl font-bold text-gray-800 mb-4">View All Services</h1>
//         <div className="text-center text-2xl p-6">
//           <div className="animate-spin inline-block w-8 h-8 border-t-2 border-b-2 border-gray-500 rounded-full"></div>
//         </div>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-6">
//   <h1 className="text-2xl font-bold text-gray-800 mb-4 items-center">View All Services</h1>
//   <p className="text-red-500 text-center">Failed to load services. Try again later.</p>
// </div>

//     );
//   } 
//   return (
    
//       <div className="bg-gray-200 min-h-screen p-2">
//         <h1 className="text-2xl font-bold text-gray-800 mb-4">View All Services</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {services?.map((service) => (
//             <div 
//               key={service.id} 
//               className="bg-white p-6  hover:rounded-md 
//                           cursor-pointer"
//             >
//               <AllServiceCard service={service} />
//             </div>
//           ))}
//         </div>
//       </div>
//     );
// }

// export default Services 
import { useState } from "react";
import { useGetAllQuery } from "../api/serviceApi";
import AllServiceCard from "../Cards/AllServiceCard";
import { Search } from "lucide-react";
const Services = () => {
  const { data: services, isLoading, isError, refetch } = useGetAllQuery();
  const [searchQuery, setSearchQuery] = useState("");

  console.log("services", services);
  console.log("serch query",searchQuery);
  // Filter services based on search query (case-insensitive)
  const filteredServices = services?.filter((service) =>
    service.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  console.log("filtered query",filteredServices)
  if (isLoading) {
    return (
      <div className="bg-gray-100 min-h-screen p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          View All Services
        </h1>
        <div className="text-center text-2xl p-6">
          <div className="animate-spin inline-block w-8 h-8 border-t-2 border-b-2 border-gray-500 rounded-full"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 ">
          View All Services
        </h1>
        <p className="text-red-500 text-center">
          Failed to load services. Try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-200 min-h-screen p-6 ">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 sticky-top mt-15">
        View All Services
      </h1>

      {/* Search Input */}
      <div className="mb-6 flex justify-center ">
      <div className="relative w-full max-w-md">
    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Search className="text-gray-500" size={18} />
    </span>
        <input
          type="text"
          placeholder="Search services based on Category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-black"
        />
      </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices?.length > 0 ? (
          filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white p-6 hover:rounded-md cursor-pointer"
            >
              <AllServiceCard service={service} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-600 text-lg">
            No services found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
