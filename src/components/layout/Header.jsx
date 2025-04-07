




import { Link, useNavigate } from "react-router-dom";
//import Cookies from "js-cookie";
import { useCookies } from "react-cookie";
// const getUserRole = () => {
//   const authToken = Cookies.get("authToken");
//   if (!authToken) return null;

//   try {
//     const tokenPayload = JSON.parse(atob(authToken.split(".")[1])); 
//     console.log("in token geeting role" + tokenPayload.role)
//     return tokenPayload.role;
//   } catch (error) {
//     console.error("Error decoding token:", error);
//     return null;
//   }
// };
// Extract role from JWT token stored in cookie
const getUserRoleFromToken = (token) => {
  if (!token) return null;

  try {
    const tokenPayload = JSON.parse(atob(token.split(".")[1]));
    console.log("in token geeting role" + tokenPayload.role)
    return tokenPayload.role;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

const Header = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["authToken"]);
  const authToken = cookies.authToken;
  const isAuthenticated = !!authToken;
  const userRole = getUserRoleFromToken(authToken);

  console.log("heder user role",userRole)
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userName = user?.name || "User";
  const handleLogout = () => {
    removeCookie("authToken", { path: "/" });
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-700 shadow-md py-4 px-6 flex justify-between items-center">
      <Link to="/" className="flex items-center text-white">
        <svg className="h-6 w-6 text-white" viewBox="0 0 40 40" fill="currentColor">
          <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6333L29.3167 10.9833L31.6667 13.3333L16.6667 28.3333Z" />
        </svg>
        <span className="ml-2 text-2xl font-bold">Home Service App</span>
      </Link>

      <nav className="hidden md:flex space-x-6">
        {isAuthenticated && userRole === "PROVIDER" && (
          <Link to="/dashboard" className="text-white hover:text-gray-200 transition duration-300 underline-offset-4 hover:underline">
            Dashboard
          </Link>
        )}
          {isAuthenticated && userRole === "USER" && (
          <Link to="/user-profile" className="text-white hover:text-gray-200 transition duration-300 underline-offset-4 hover:underline">
            Profile
          </Link>
        )}
        <Link to="/" className="text-white hover:text-gray-200 transition duration-300 underline-offset-4 hover:underline">
          Home
        </Link>
        <Link to="/services" className="text-white hover:text-gray-200 transition duration-300 underline-offset-4 hover:underline">
          Services
        </Link>
        <Link to="/about" className="text-white hover:text-gray-200 transition duration-300 underline-offset-4 hover:underline">
          About
        </Link>
        <Link to="/contact" className="text-white hover:text-gray-200 transition duration-300 underline-offset-4 hover:underline">
          Contact
        </Link>
      </nav>

      <div className="flex space-x-4">
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-white text-indigo-700 font-semibold rounded-md hover:bg-indigo-100 transition duration-300 shadow-md"
          >
           {userName}
          </button>
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
