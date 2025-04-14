// import { useEffect, useState } from "react";
// import ServiceCard from "../../Cards/ServiceCard";
// import { useGetAllServicesQuery } from "../../api/serviceApi";
// import Sidebar from "../../Sidebar";
// import { jwtDecode } from "jwt-decode";
// import { useCookies } from "react-cookie";
// function ViewService() {
//   const [cookies, setCookie] = useCookies(["authToken"]);
//   const [serviceProviderId, setServiceProviderId] = useState();
//   const [currentPage,setCurrentPage] = useState(0);
//   const itemPerPage=6;

//   useEffect(() => {
//     const token = cookies.authToken;
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         if (!decoded.serviceProviderId) {
//           console.error("Service Provider ID not found in token!");
//           return;
//         }
//         setServiceProviderId(decoded.serviceProviderId);
//       } catch (error) {
//         console.log("Invalid token");
//       }
//     }
//   }, [cookies]);
//   const { data, error, isLoading, isError } =
//     useGetAllServicesQuery(serviceProviderId);
   
//     const totalPage = Math.ceil((data ?.length || 0 )/itemPerPage)
//     const paginationService = ()=>{
//       const start = currentPage * itemPerPage
//       const end = (currentPage + 1) * itemPerPage
//       return data ?.slice(start,end)
//     }

 

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar />
  
//       <main className="flex-1 p-6 mt-13">
//         <h1 className="text-2xl font-bold text-gray-800 mb-4">View All Services</h1>
  
//         {isLoading ? (
//           <div className="text-center text-2xl p-6">
//             <div className="animate-spin inline-block w-8 h-8 border-t-2 border-b-2 border-gray-500 rounded-full"></div>
//           </div>
//         ) : isError ? (
//           <p className="text-center text-red-500">Failed to load services. Try again later.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {paginationService()?.map((service) => (
//               <div
//                 key={service.serviceId}
//                 className="bg-gray-300 p-6 hover:rounded-md cursor-pointer"
//               >
//                 <ServiceCard service={service} />
//               </div>
//             ))}
//           </div>
//           {/* Pagination Controls */}
//           <div className="mt-8 flex justify-center items-center space-x-4">
//           <button
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
//             disabled={currentPage === 0}
//             className="px-4 py-2 bg-white text-gray-800 border rounded-md hover:bg-gray-100 disabled:opacity-50"
//           >
//             Previous
//           </button>

//           <span className="text-gray-700 font-semibold">
//             Page {currentPage + 1} of {totalPages}
//           </span>

//           <button
//             onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
//             disabled={currentPage >= totalPages - 1}
//             className="px-4 py-2 bg-white text-gray-800 border rounded-md hover:bg-gray-100 disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
    
//         )}
//       </main>
//     </div>
//   );
  
// }

// export default ViewService;
import { useEffect, useState } from "react";
import ServiceCard from "../../Cards/ServiceCard";
import { useGetAllServicesQuery } from "../../api/serviceApi";
import Sidebar from "../../Sidebar";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";
import Pagination from "../../Pagination";
function ViewService() {
  const [cookies] = useCookies(["authToken"]);
  const [serviceProviderId, setServiceProviderId] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const itemPerPage = 3;

  useEffect(() => {
    const token = cookies.authToken;
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (!decoded.serviceProviderId) {
          console.error("Service Provider ID not found in token!");
          return;
        }
        setServiceProviderId(decoded.serviceProviderId);
      } catch (error) {
        console.log("Invalid token");
      }
    }
  }, [cookies]);

  const { data, error, isLoading, isError } = useGetAllServicesQuery(serviceProviderId);

  const totalPages = Math.ceil((data?.length || 0) / itemPerPage);

  const paginationService = () => {
    const start = currentPage * itemPerPage;
    const end = start + itemPerPage;
    return data?.slice(start, end);
  };
 console.log("data",data)
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-6 mt-13">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">View All Services</h1>

        {isLoading ? (
          <div className="text-center text-2xl p-6">
            <div className="animate-spin inline-block w-8 h-8 border-t-2 border-b-2 border-gray-500 rounded-full"></div>
          </div>
        ) : isError ? (
          <p className="text-center text-red-500">Failed to load services. Try again later.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginationService()?.map((service) => (
                <div
                  key={service.serviceId}
                  className="bg-gray-300 p-6 hover:rounded-md cursor-pointer"
                >
                  <ServiceCard service={service} />
                </div>
              ))}
            </div>

            <Pagination
             currentPage={currentPage}
             totalPages={totalPages}
             onChangePage={setCurrentPage}
            />
          
          </>
        )}
      </main>
    </div>
  );
}

export default ViewService;
