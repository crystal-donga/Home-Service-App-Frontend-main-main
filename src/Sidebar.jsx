//  import { useState } from "react";
//  import { Link } from "react-router-dom";
// import { 
//   Menu, X, PlusCircle, Edit, Trash2, Eye, 
//   History, CreditCard, User, Briefcase
// } from "lucide-react"; 

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(true);

//   return (
//     <div className={`sticky-top h-screen bg-gray-900 text-white transition-all duration-300 ${isOpen ? "w-64" : "w-16"}`}>
//       {/* Sidebar Toggle Button */}
//       <button 
//         className="p-3 focus:outline-none text-white hover:bg-gray-800 w-full flex justify-end" 
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         {isOpen ? <X size={24} /> : <Menu size={24} />}
//       </button>

//       {/* Profile Section */}
//       <div className="flex items-center p-4">
//         <User size={32} />
//         {isOpen && <span className="ml-3 text-lg font-semibold">User Profile</span>}
//       </div>
//       <Link to="/provider-profile" className="flex items-center p-3 hover:bg-gray-700 transition">
//         <User size={20} />
//         <span className={`ml-3 ${!isOpen ? "hidden" : ""}`}>Profile</span>
//       </Link>

//       {/* Services Section */}
//       <nav className="mt-4">
//         <h2 className={`text-sm uppercase text-gray-400 px-4 ${!isOpen ? "hidden" : ""}`}>Services</h2>
//         <ul className="mt-2">
//           <li>
//             <Link to="/add-service" className="flex items-center p-3 hover:bg-gray-700 transition">
//               <PlusCircle size={20} />
//               <span className={`ml-3 ${!isOpen ? "hidden" : ""}`}>Add New Service</span>
//             </Link>
//           </li>
//           <li>
//             <Link to="/update-service" className="flex items-center p-3 hover:bg-gray-700 transition">
//               <Edit size={20} />
//               <span className={`ml-3 ${!isOpen ? "hidden" : ""}`}>Update Service</span>
//             </Link>
//           </li>
//           <li>
//             <Link to="/delete-service" className="flex items-center p-3 hover:bg-gray-700 transition">
//               <Trash2 size={20} />
//               <span className={`ml-3 ${!isOpen ? "hidden" : ""}`}>Delete Service</span>
//             </Link>
//           </li>
//           <li>
//             <Link to="/view-services" className="flex items-center p-3 hover:bg-gray-700 transition">
//               <Eye size={20} />
//               <span className={`ml-3 ${!isOpen ? "hidden" : ""}`}>View All Services</span>
//             </Link>
//           </li>
//         </ul>
//       </nav>

//       {/* Provider Details Section */}
//       <nav className="mt-6">
//         <h2 className={`text-sm uppercase text-gray-400 px-4 ${!isOpen ? "hidden" : ""}`}>Providers</h2>
//         <ul className="mt-2">
//           <li>
//             <Link to="/provider-details/register" className="flex items-center p-3 hover:bg-gray-700 transition">
//               <Briefcase size={20} /> 
//               <span className={`ml-3 ${!isOpen ? "hidden" : ""}`}>Provider Details</span>
//             </Link>
//           </li>
//         </ul>
//       </nav>

//       {/* History Section */}
//       <nav className="mt-6">
//         <h2 className={`text-sm uppercase text-gray-400 px-4 ${!isOpen ? "hidden" : ""}`}>History</h2>
//         <ul className="mt-2">
//           <li>
//             <Link to="/service-history" className="flex items-center p-3 hover:bg-gray-700 transition">
//               <History size={20} />
//               <span className={`ml-3 ${!isOpen ? "hidden" : ""}`}>Service History</span>
//             </Link>
//           </li>
//         </ul>
//       </nav>

//       {/* Payment Section */}
//       <nav className="mt-6">
//         <h2 className={`text-sm uppercase text-gray-400 px-4 ${!isOpen ? "hidden" : ""}`}>Payments</h2>
//         <ul className="mt-2">
//           <li>
//             <Link to="/payment" className="flex items-center p-3 hover:bg-gray-700 transition">
//               <CreditCard size={20} />
//               <span className={`ml-3 ${!isOpen ? "hidden" : ""}`}>Payment</span>
//             </Link>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };


// export default Sidebar;

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu, X, PlusCircle, Edit, Trash2, Eye, 
  History, CreditCard, User, Briefcase
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  //`sticky-top h-screen bg-gray-100 text-white fixed left-0 top-13 z-150 flex flex-col transition-all duration-100 ${isCollapsed ? "w-13" : "w-[200px]"}`
  //`sticky-top h-screen  bg-gray-200 text-black transition-all duration-300 ${isOpen ? "w-55" : "w-16"}`
  return (
    <div className={`sticky-top h-screen  mt-15 bg-gray-200 text-black transition-all duration-300 ${isOpen ? "w-55" : "w-16"}`}>
      
      {/* Sidebar Toggle Button */}
      <button 
        className="p-3 focus:outline-none text-black hover:bg-gray-300 w-full flex justify-end" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Profile Section */}
      <div className="flex items-center p-4">
        {/* <User size={32} /> */}
        {isOpen && <span className="ml-3 text-lg font-semibold">User Profile</span>}
      </div>
      <Link to="/provider-profile" className="flex items-center p-3 hover:bg-gray-300 transition">
        <User size={20} />
        <span className={`ml-3 ${!isOpen ? "hidden" : ""}`}>Me</span>
      </Link>

      {/* Services Section (Hover to Expand) */}
      <nav className=" relative group">
        <div className="flex items-center p-3 hover:bg-gray-300 transition cursor-pointer">
          <PlusCircle size={20} />
          <span className={`ml-3 ${!isOpen ? "hidden" : ""}`}>Services</span>
        </div>

        {/* Submenu - Expands Outside */}
        <ul className="absolute left-full top-0 bg-gray-200 shadow-lg p-2 w-48 hidden group-hover:block">
          <li>
            <Link to="/add-service" className="flex items-center p-2 hover:bg-gray-300 transition">
              <PlusCircle size={18} />
              <span className="ml-3">Add New Service</span>
            </Link>
          </li>
         
          <li>
            <Link to="/view-services" className="flex items-center p-2 hover:bg-gray-300 transition">
              <Eye size={18} />
              <span className="ml-3">View All Services</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Provider Details */}
      {/* <Link to="/provider-details/register" className="flex items-center p-3 hover:bg-gray-300 transition">
        <Briefcase size={20} />
        <span className={`ml-3 ${!isOpen ? "hidden" : ""}`}>Provider Details</span>
      </Link> */}

      {/* History */}
      <Link to="/service-history" className="flex items-center p-3 hover:bg-gray-300 transition">
        <History size={20} />
        <span className={`ml-3 ${!isOpen ? "hidden" : ""}`}>History</span>
      </Link>

      {/* Payments */}
      <Link to="/payment" className="flex items-center p-3 hover:bg-gray-300 transition">
        <CreditCard size={20} />
        <span className={`ml-3 ${!isOpen ? "hidden" : ""}`}>Payments</span>
      </Link>
    </div>
  );
};

export default Sidebar;
