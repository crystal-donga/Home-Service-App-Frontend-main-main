
import { useState,useEffect } from "react";
import { useGetAllQuery } from "../api/serviceApi";
import AllServiceCard from "../Cards/AllServiceCard";
import { Search } from "lucide-react";
import Pagination from "../Pagination"; 

const Services = () => {
  useEffect(()=>{
          document.title="Services"
      },[])
  const { data: services, isLoading, isError } = useGetAllQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemPerPage = 6;
  
  console.log("services ",services)
  const filteredServices = services?.filter((service) =>
    service.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil((filteredServices?.length || 0) / itemPerPage);
  console.log("total page",totalPages)
  const paginationService = () => {
    const start = currentPage * itemPerPage;
    const end = start + itemPerPage;
    return filteredServices?.slice(start, end);
  };

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
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          View All Services
        </h1>
        <p className="text-red-500 text-center">
          Failed to load services. Try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-200 min-h-screen p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        View All Services
      </h1>

      {/* Search Input */}
      <div className="mb-6 flex justify-center">
        <div className="relative w-full max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-500" size={18} />
          </span>
          <input
            type="text"
            placeholder="Search services based on Category..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(0); // Reset to first page when searching
            }}
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-black"
          />
        </div>
      </div>

      {/* Service Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices?.length > 0 ? (
          paginationService().map((service) => (
            <div
              key={service.serviceId}
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

      {/* Pagination Component */}
      {filteredServices?.length > itemPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onChangePage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Services;
