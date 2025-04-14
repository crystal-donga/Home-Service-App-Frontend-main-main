
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  Heart,
  ShoppingCart,
  User,
  ShoppingBag,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState, useRef } from "react";

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
  const location = useLocation();
  const [cookies, , removeCookie] = useCookies(["authToken"]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef();

  const authToken = cookies.authToken;
  const isAuthenticated = !!authToken;
  const userRole = getUserRoleFromToken(authToken);

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userName = user?.name || "User";

  const handleLogout = () => {
    setDropdownOpen(false);
    removeCookie("authToken", { path: "/" });
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleProfileClick = () => {
    setDropdownOpen(false);
    navigate("/me");
  };

  const handleOrdersClick = () => {
    setDropdownOpen(false);
    navigate("/orders");
  };

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-800 to-indigo-700 shadow-md py-4 px-6 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="flex items-center text-white">
        <svg className="h-6 w-6 text-white" viewBox="0 0 40 40" fill="currentColor">
          <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6333L29.3167 10.9833L31.6667 13.3333L16.6667 28.3333Z" />
        </svg>
        <span className="ml-2 text-2xl font-bold">Home Service App</span>
      </Link>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Nav Links */}
      <nav className={`md:flex md:space-x-6 ${mobileMenuOpen ? "block mt-4 space-y-2" : "hidden md:block"}`}>
        {isAuthenticated && userRole === "PROVIDER" && (
          <Link to="/dashboard" className={`block transition duration-300 ${isActive("/dashboard") ? "text-yellow-400" : "text-white hover:text-gray-200"}`}>
            Dashboard
          </Link>
        )}
        <Link to="/home" className={`block transition duration-300 ${isActive("/home") ? "text-yellow-300 font-semibold" : "text-white hover:text-gray-200"}`}>
          Home
        </Link>
        {userRole === "USER" && (
        <Link to="/services" className={`block transition duration-300 ${isActive("/services") ? "text-yellow-300 font-semibold" : "text-white hover:text-gray-200"}`}>
          Services
        </Link>
        )}
        <Link to="/about" className={`block transition duration-300 ${isActive("/about") ? "text-yellow-300 font-semibold" : "text-white hover:text-gray-200"}`}>
          About
        </Link>
        <Link to="/contact" className={`block transition duration-300 ${isActive("/contact") ? "text-yellow-300 font-semibold" : "text-white hover:text-gray-200"}`}>
          Contact
        </Link>
      </nav>

      {/* Right Side */}
      <div className="hidden md:flex items-center space-x-4">
        {isAuthenticated && userRole === "USER" && (
          <>
            <Link to="/whishlist">
              <button className={`cursor-pointer transition duration-300 ${isActive("/whishlist") ? "text-yellow-400" : "text-white hover:text-gray-200"}`}>
                <Heart size={20} />
              </button>
            </Link>
            <Link to="/cart">
              <button className={`cursor-pointer transition duration-300 ${isActive("/cart") ? "text-yellow-400" : "text-white hover:text-gray-200"}`}>
                <ShoppingCart size={20} />
              </button>
            </Link>
          </>
        )}

        {isAuthenticated ? (
          <div className="relative" ref={dropdownRef} onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
            <button className="p-2 bg-white text-indigo-700 rounded-full hover:bg-gray-500 transition duration-300 shadow-md cursor-pointer">
              <User size={20} />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <div className="px-4 py-2 pl-10 text-purple-700 font-semibold border-b border-gray-100">
                  {userName}
                </div>
                {userRole === "USER" && (
                  <>
                    <button onClick={handleProfileClick} className={`w-full px-4 py-2 text-left flex items-center cursor-pointer ${isActive("/me") ? "bg-gray-100 font-semibold" : "text-gray-800 hover:bg-gray-300"}`}>
                      <User className="mr-2" size={16} />
                      My Profile
                    </button>
                    <button onClick={handleOrdersClick} className={`w-full px-4 py-2 text-left flex items-center cursor-pointer ${isActive("/orders") ? "bg-gray-100 font-semibold" : "text-gray-800 hover:bg-gray-100"}`}>
                      <ShoppingBag className="mr-2" size={16} />
                      My Orders
                    </button>
                  </>
                )}
                <button onClick={handleLogout} className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-100 flex items-center cursor-pointer">
                  <LogOut className="mr-2" size={16} />
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="px-4 py-2 text-white hover:bg-white hover:text-indigo-700 transition duration-300 rounded-md">
              Sign in
            </Link>
            <Link to="/register" className="px-4 py-2 bg-white text-indigo-700 font-semibold rounded-md hover:bg-indigo-100 transition duration-300 shadow-md">
              Sign up
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
