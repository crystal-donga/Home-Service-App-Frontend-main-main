
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { 
//   Menu, X, CircleUser, Heart, ShoppingCart, Package, LogOut 
// } from "lucide-react";

// const UserSidebar = () => {
//   const [isOpen, setIsOpen] = useState(true);

//   return (
//     <div className={`fixed top-18 left-0  h-screen bg-gray-900 text-white transition-all duration-300 ${isOpen ? "w-64" : "w-16"} fixed top-0 left-0`}>
//       {/* Sidebar Toggle Button */}
//       <button 
//         className="p-3 text-white hover:bg-gray-800 w-full flex justify-end" 
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         {isOpen ? <X size={24} /> : <Menu size={24} />}
//       </button>

//       {/* Profile Section */}
//       <div className="flex items-center p-4">
//         <CircleUser size={32} />
//         {isOpen && <span className="ml-3 text-lg font-semibold">Account</span>}
//       </div>

//       {/* Sidebar Navigation */}
//       <nav className="mt-4">
//         <ul>
//           <li>
//             <Link to="/Account" className="flex items-center p-3 hover:bg-gray-700 transition">
//               <CircleUser size={20} />
//               <span className={`ml-3 ${!isOpen ? "hidden" : ""}`}>Profile</span>
//             </Link>
//           </li>
//           <li>
//             <Link to="/wishlist" className="flex items-center p-3 hover:bg-gray-700 transition">
//               <Heart size={20} />
//               <span className={`ml-3 ${!isOpen ? "hidden" : ""}`}>Wishlist</span>
//             </Link>
//           </li>
//           <li>
//             <Link to="/cart" className="flex items-center p-3 hover:bg-gray-700 transition">
//               <ShoppingCart size={20} />
//               <span className={`ml-3 ${!isOpen ? "hidden" : ""}`}>Cart</span>
//             </Link>
//           </li>
//           <li>
//             <Link to="/orders" className="flex items-center p-3 hover:bg-gray-700 transition">
//               <Package size={20} />
//               <span className={`ml-3 ${!isOpen ? "hidden" : ""}`}>Orders</span>
//             </Link>
//           </li>
//         </ul>
//       </nav>

//       {/* Logout Button */}
//       <div className="absolute bottom-4 w-full">
//         <button className="flex items-center p-3 w-full hover:bg-red-600 transition">
//           <LogOut size={20} />
//           <span className={`ml-3 ${!isOpen ? "hidden" : ""}`}>Logout</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UserSidebar;
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { Menu, X, CircleUser, Heart, ShoppingCart, Package, LogOut } from "lucide-react";

// const UserSidebar = ({ onCollapse }) => {
//   const [isOpen, setIsOpen] = useState(true);

//   const handleCollapse = () => {
//     setIsOpen(false);
//     onCollapse(); // Notify parent component
//   };

//   return (
//     <div className={`fixed top-18 top-0 left-0 h-screen bg-gray-900 text-white transition-all duration-300 ${isOpen ? "w-64" : "w-16"}`}>
//       {/* Sidebar Toggle Button */}
//       <button 
//         className="p-3 text-white hover:bg-gray-800 w-full flex justify-end" 
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         {isOpen ? <X size={24} /> : <Menu size={24} />}
//       </button>

//       {/* Profile Section */}
//       <div className="flex items-center p-4 cursor-pointer" onClick={handleCollapse}>
//         <CircleUser size={32} />
//         {isOpen && <span className="ml-3 text-lg font-semibold">Account</span>}
//       </div>

//       {/* Sidebar Navigation */}
//       <nav className="mt-4">
//         <ul>
//           <li>
//             <Link to="/wishlist" className="flex items-center p-3 hover:bg-gray-700 transition">
//               <Heart size={20} />
//               <span className={`ml-3 ${!isOpen ? "hidden" : ""}`}>Wishlist</span>
//             </Link>
//           </li>
//           <li>
//             <Link to="/cart" className="flex items-center p-3 hover:bg-gray-700 transition">
//               <ShoppingCart size={20} />
//               <span className={`ml-3 ${!isOpen ? "hidden" : ""}`}>Cart</span>
//             </Link>
//           </li>
//           <li>
//             <Link to="/orders" className="flex items-center p-3 hover:bg-gray-700 transition">
//               <Package size={20} />
//               <span className={`ml-3 ${!isOpen ? "hidden" : ""}`}>Orders</span>
//             </Link>
//           </li>
//         </ul>
//       </nav>

//       {/* Logout Button */}
//       <div className="absolute bottom-4 w-full">
//         <button className="flex items-center p-3 w-full hover:bg-red-600 transition">
//           <LogOut size={20} />
//           <span className={`ml-3 ${!isOpen ? "hidden" : ""}`}>Logout</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UserSidebar;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, CircleUser, Heart, ShoppingCart, Package ,User } from "lucide-react";

const UserSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  // sticky-top fixed top-18 left-0 h-screen bg-gray-900 text-white transition-all duration-300
  return (
    <div className={`sticky-top fixed top-18 left-0 h-screen bg-gray-100 text-black transition-all duration-300 ${isOpen ? "w-55" : "w-16"}`}>
      {/* Sidebar Toggle Button */}
      <button 
        className="p-3 text-black hover:bg-gray-300 w-full flex justify-end" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Profile Section */}
      <div className="flex items-center p-4  ">
        <CircleUser size={32} />
        {isOpen && <span className="ml-3 text-lg font-semibold  ">Account</span>}
      </div>
       
      {/* Sidebar Navigation */}
      <nav className="mt-4">
        <ul>
          <li>
            <Link to="/user-details" className="flex items-center p-3 hover:bg-gray-300 transition" >
            <User size={20} />
              <span className={`ml-3 ${!isOpen ? "hidden" : ""} `}>User Details</span>
            </Link>
          </li>
          <li>
            <Link to="/me" className="flex items-center p-3 hover:bg-gray-300 transition">
              <CircleUser size={20} />
              <span className={`ml-3 ${!isOpen ? "hidden" : ""}`}>Me</span>
            </Link>
          </li>
          <li>
            <Link to="/wishlist" className="flex items-center p-3 hover:bg-gray-300 transition">
              <Heart size={20} />
              <span className={`ml-3 ${!isOpen ? "hidden" : ""}`}>Wishlist</span>
            </Link>
          </li>
          <li>
            <Link to="/cart" className="flex items-center p-3 hover:bg-gray-300 transition">
              <ShoppingCart size={20} />
              <span className={`ml-3 ${!isOpen ? "hidden" : ""}`}>Cart</span>
            </Link>
          </li>
          <li>
            <Link to="/orders" className="flex items-center p-3 hover:bg-gray-300 transition">
              <Package size={20} />
              <span className={`ml-3 ${!isOpen ? "hidden" : ""}`}>Orders</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Logout Button
      <div className="absolute bottom-4 w-full">
        <button className="flex items-center p-3 hover:bg-red-600 transition">
          <LogOut size={20} />
          <span className={`ml-3 ${!isOpen ? "hidden" : ""}`}>Logout</span>
        </button>
      </div> */}
    </div>
  );
};

export default UserSidebar;
