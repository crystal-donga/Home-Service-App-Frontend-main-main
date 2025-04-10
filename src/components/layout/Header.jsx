// // import { Link, useNavigate } from "react-router-dom";
// // import { useCookies } from "react-cookie";
// // import { Bell, ShoppingCart } from "lucide-react";

// // // Extract role from JWT token stored in cookie
// // const getUserRoleFromToken = (token) => {
// //   if (!token) return null;

// //   try {
// //     const tokenPayload = JSON.parse(atob(token.split(".")[1]));

// //     console.log("in token geeting role" + tokenPayload.role)

// //     return tokenPayload.role;
// //   } catch (error) {
// //     console.error("Error decoding token:", error);
// //     return null;
// //   }
// // };

// // const Header = () => {
// //   const navigate = useNavigate();
// //   const [cookies, setCookie, removeCookie] = useCookies(["authToken"]);

// //   const authToken = cookies.authToken;
// //   const isAuthenticated = !!authToken;
// //   const userRole = getUserRoleFromToken(authToken);

// //   console.log("heder user role",userRole)
// //   const storedUser = localStorage.getItem("user");
// //   const user = storedUser ? JSON.parse(storedUser) : null;
// //   const userName = user?.name || "User";
// //   const handleLogout = () => {
// //     removeCookie("authToken", { path: "/" });
// //     localStorage.removeItem("user");
// //     navigate("/login");

// //   };
// // //bg-gradient-to-r from-purple-800 to-indigo-700
// //   return (
// //     <header className="fixed top-0 left-0 right-0  bg-gradient-to-r from-purple-800 to-indigo-700 shadow-md py-4 px-6 flex justify-between items-center">
// //       <Link to="/" className="flex items-center text-white">
// //         <svg className="h-6 w-6 text-white" viewBox="0 0 40 40" fill="currentColor">
// //           <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6333L29.3167 10.9833L31.6667 13.3333L16.6667 28.3333Z" />
// //         </svg>
// //         <span className="ml-2 text-2xl font-bold">Home Service App</span>
// //       </Link>

// //       <nav className="hidden md:flex space-x-6">
// //         {isAuthenticated && userRole === "PROVIDER" && (
// //           <Link to="/dashboard" className="text-white hover:text-gray-200 transition duration-300 underline-offset-4 hover:underline">
// //             Dashboard
// //           </Link>
// //         )}
// //         {isAuthenticated && userRole === "USER" && (
// //           <Link to="/user-profile" className="text-white hover:text-gray-200 transition duration-300 underline-offset-4 hover:underline">
// //             Profile
// //           </Link>
// //         )}
// //         <Link to="/" className="text-white hover:text-gray-200 transition duration-300 underline-offset-4 hover:underline">
// //           Home
// //         </Link>
// //         <Link to="/services" className="text-white hover:text-gray-200 transition duration-300 underline-offset-4 hover:underline">
// //           Services
// //         </Link>
// //         <Link to="/about" className="text-white hover:text-gray-200 transition duration-300 underline-offset-4 hover:underline">
// //           About
// //         </Link>
// //         <Link to="/contact" className="text-white hover:text-gray-200 transition duration-300 underline-offset-4 hover:underline">
// //           Contact
// //         </Link>
// //       </nav>

// //       <div className="flex space-x-4">
// //         {isAuthenticated ? (
// //           <button
// //             onClick={handleLogout}
// //             className="px-4 py-2 bg-white text-indigo-700 font-semibold rounded-md hover:bg-indigo-100 transition duration-300 shadow-md"
// //           >
// //            {userName}
// //           </button>
// //         ) : (
// //           <>
// //             <Link to="/login" className="px-4 py-2 text-white hover:bg-white hover:text-indigo-700 transition duration-300 rounded-md">
// //               Sign in
// //             </Link>
// //             <Link to="/register" className="px-4 py-2 bg-white text-indigo-700 font-semibold rounded-md hover:bg-indigo-100 transition duration-300 shadow-md">
// //               Sign up
// //             </Link>
// //           </>
// //         )}
// //       </div>
// //     </header>
// //   );
// // };

// // export default Header;

// import { Link, useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";
// import { Bell, ShoppingCart } from "lucide-react"; // using lucide-react icons
// import { useState } from "react";

// // Extract role from JWT token stored in cookie
// const getUserRoleFromToken = (token) => {
//   if (!token) return null;

//   try {
//     const tokenPayload = JSON.parse(atob(token.split(".")[1]));
//     return tokenPayload.role;
//   } catch (error) {
//     console.error("Error decoding token:", error);
//     return null;
//   }
// };

// const Header = () => {
//   const navigate = useNavigate();
//   const [cookies, , removeCookie] = useCookies(["authToken"]);
//   const [showLogout, setShowLogout] = useState(false);

//   const authToken = cookies.authToken;
//   const isAuthenticated = !!authToken;
//   const userRole = getUserRoleFromToken(authToken);

//   const storedUser = localStorage.getItem("user");
//   const user = storedUser ? JSON.parse(storedUser) : null;
//   const userName = user?.name || "User";

//   const handleLogout = () => {
//     removeCookie("authToken", { path: "/" });
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   return (
//     <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-800 to-indigo-700 shadow-md py-4 px-6 flex justify-between items-center">
//       {/* Left side: Logo */}
//       <Link to="/" className="flex items-center text-white">
//         <svg className="h-6 w-6 text-white" viewBox="0 0 40 40" fill="currentColor">
//           <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6333L29.3167 10.9833L31.6667 13.3333L16.6667 28.3333Z" />
//         </svg>
//         <span className="ml-2 text-2xl font-bold">Home Service App</span>
//       </Link>

//       {/* Middle nav links */}
//       <nav className="hidden md:flex space-x-6">
//         {isAuthenticated && userRole === "PROVIDER" && (
//           <Link to="/dashboard" className="text-white hover:text-gray-200 transition duration-300 underline-offset-4 hover:underline">
//             Dashboard
//           </Link>
//         )}
//         {isAuthenticated && userRole === "USER" && (
//           <Link to="/user-profile" className="text-white hover:text-gray-200 transition duration-300 underline-offset-4 hover:underline">
//             Profile
//           </Link>
//         )}
//         <Link to="/" className="text-white hover:text-gray-200 transition duration-300 underline-offset-4 hover:underline">
//           Home
//         </Link>
//         <Link to="/services" className="text-white hover:text-gray-200 transition duration-300 underline-offset-4 hover:underline">
//           Services
//         </Link>
//         <Link to="/about" className="text-white hover:text-gray-200 transition duration-300 underline-offset-4 hover:underline">
//           About
//         </Link>
//         <Link to="/contact" className="text-white hover:text-gray-200 transition duration-300 underline-offset-4 hover:underline">
//           Contact
//         </Link>
//       </nav>

//       {/* Right side: Cart, Notification, Auth Buttons */}
//       <div className="flex items-center space-x-4">
//         {/* Notification & Cart Icons */}
//         {isAuthenticated && (
//           <>
//             <button className="text-white hover:text-gray-200">
//               <Bell size={20} />
//             </button>
//             <button className="text-white hover:text-gray-200">
//               <ShoppingCart size={20} />
//             </button>
//           </>
//         )}

//         {/* Auth Buttons */}
//         {isAuthenticated ? (
//           <div className="relative">
//             {!showLogout ? (
//               <button
//                 onClick={() => setShowLogout(true)}
//                 className="px-4 py-2 bg-white text-indigo-700 font-semibold rounded-md hover:bg-indigo-100 transition duration-300 shadow-md"
//               >
//                 {userName}
//               </button>
//             ) : (
//               <button
//                 onClick={handleLogout}
//                 className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-300 shadow-md"
//               >
//                 Sign out
//               </button>
//             )}
//           </div>
//         ) : (
//           <>
//             <Link to="/login" className="px-4 py-2 text-white hover:bg-white hover:text-indigo-700 transition duration-300 rounded-md">
//               Sign in
//             </Link>
//             <Link to="/register" className="px-4 py-2 bg-white text-indigo-700 font-semibold rounded-md hover:bg-indigo-100 transition duration-300 shadow-md">
//               Sign up
//             </Link>
//           </>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Bell, Heart, ShoppingCart} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { LogOut , User } from "lucide-react";
// Utility to decode token
const getUserRoleFromToken = (token) => {
  if (!token) return null;
  try {
    const tokenPayload = JSON.parse(atob(token.split(".")[1]));
    return tokenPayload.role;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

const Header = () => {
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies(["authToken"]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const authToken = cookies.authToken;
  const isAuthenticated = !!authToken;
  const userRole = getUserRoleFromToken(authToken);

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userName = user?.name || "User";

  const handleLogout = () => {
    removeCookie("authToken", { path: "/" });
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-800 to-indigo-700 shadow-md py-4 px-6 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="flex items-center text-white">
        <svg
          className="h-6 w-6 text-white"
          viewBox="0 0 40 40"
          fill="currentColor"
        >
          <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6333L29.3167 10.9833L31.6667 13.3333L16.6667 28.3333Z" />
        </svg>
        <span className="ml-2 text-2xl font-bold">Home Service App</span>
      </Link>

      {/* Nav Links */}
      <nav className="hidden md:flex space-x-6">
        {isAuthenticated && userRole === "PROVIDER" && (
          <Link
            to="/dashboard"
            className="text-white hover:text-gray-200 transition duration-300 underline-offset-4 hover:underline"
          >
            Dashboard
          </Link>
        )}
        {isAuthenticated && userRole === "USER" && (
          <Link
            to="/user-profile"
            className="text-white hover:text-gray-200 transition duration-300 underline-offset-4 hover:underline"
          >
            Profile
          </Link>
        )}
        <Link
          to="/"
          className="text-white hover:text-gray-200 transition duration-300 underline-offset-4 hover:underline"
        >
          Home
        </Link>
        <Link
          to="/services"
          className="text-white hover:text-gray-200 transition duration-300 underline-offset-4 hover:underline"
        >
          Services
        </Link>
        <Link
          to="/about"
          className="text-white hover:text-gray-200 transition duration-300 underline-offset-4 hover:underline"
        >
          About
        </Link>
        <Link
          to="/contact"
          className="text-white hover:text-gray-200 transition duration-300 underline-offset-4 hover:underline"
        >
          Contact
        </Link>
      </nav>

      {/* Right Side */}
      <div className="flex items-center space-x-4">
        {/* Icons */}
        {isAuthenticated &&  userRole === "USER" && (
          <>  
            
            <Link to="/whishlist">
             <button className="text-white hover:text-gray-200 cursor-pointer">
              <Heart size={20} />
            </button>
            </Link>

            <Link to="/cart">
             <button className="text-white hover:text-gray-200 cursor-pointer">
              <ShoppingCart size={20} />
            </button>
            </Link>

            <Link to ="/notification">
            <button className="text-white hover:text-gray-200 cursor-pointer">
              <Bell size={20} />
            </button>
            </Link>
          </>
        )}

        {/* Auth Buttons */}
        {isAuthenticated ? (
        

          <div className="relative" ref={dropdownRef}>
            {/* User Icon Button */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="p-2 bg-white text-indigo-700 rounded-full hover:bg-indigo-100 transition duration-300 shadow-md cursor-pointer"
            >
              <User size={20} />
            </button>
          
            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-gray-300 border border-gray-200 rounded-md shadow-lg z-10">
                {/* Username display */}
                <div className="px-4 py-2 text-purple-700 font-medium border-b border-gray-100">
                  {userName}
                </div>
                
                {/* Logout button */}
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left bg-red-600 text-white hover:bg-red-700 hover:text-white flex items-center cursor-pointer"
                >
                  <LogOut className="mr-2" size={16} />
                  Sign out
                </button>
              </div>
            )}
          </div>
          
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 text-white hover:bg-white hover:text-indigo-700 transition duration-300 rounded-md"
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-white text-indigo-700 font-semibold rounded-md hover:bg-indigo-100 transition duration-300 shadow-md"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
