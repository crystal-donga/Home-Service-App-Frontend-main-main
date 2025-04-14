

import { useState } from "react";
import { Link,useLocation } from "react-router-dom";
import {
  Menu, X, PlusCircle, Edit, Trash2, Eye, 
  History, CreditCard, User, Briefcase
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const isActive = (path)=>location.pathname===path
  return (
    <div className={`sticky-top  h-screen  mt-15 bg-white text-black transition-all duration-100 ${isOpen ? "w-40 " : "w-16"}`}>
      
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
      <Link to="/provider-profile"   className={`flex items-center p-3 transition ${
          isActive("/provider-profile") ? " text-purple-800 font-semibold" : "hover:bg-gray-300"
        }`}>
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
            <Link to="/add-service" className={`flex items-center p-3 transition ${
          isActive("/add-service") ? " text-purple-800 font-semibold" : "hover:bg-gray-300"
        }`}>
              <PlusCircle size={18} />
              <span className="ml-3">Add New Service</span>
            </Link>
          </li>
         
          <li>
            <Link to="/view-services" className={`flex items-center p-3 transition ${
          isActive("/view-services") ? " text-purple-800 font-semibold" : "hover:bg-gray-300"
        }`}>
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
      <Link to="/service-history"  className={`flex items-center p-3 transition ${
          isActive("/service-history") ? " text-purple-800 font-semibold" : "hover:bg-gray-300"
        }`}>
        <History size={20} />
        <span className={`ml-3 ${!isOpen ? "hidden" : ""}`}>History</span>
      </Link>

      {/* Payments */}
      <Link to="/payment"  className={`flex items-center p-3 transition ${
          isActive("/payment") ? " text-purple-800 font-semibold" : "hover:bg-gray-300"
        }`}>
        <CreditCard size={20} />
        <span className={`ml-3 ${!isOpen ? "hidden" : ""}`}>Payments</span>
      </Link>
    </div>
  );
};

export default Sidebar;
