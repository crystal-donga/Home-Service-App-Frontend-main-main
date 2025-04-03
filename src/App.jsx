
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Cookies from "js-cookie";  // ✅ Import Cookies
// import Header from "./components/layout/Header";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import Contact from "./pages/ContactUs";
// import Footer from "./components/layout/Footer";
// import AboutUs from "./pages/Aboutus";
// import Services from "./pages/Services";

// const App = () => {
//   const getUserRole = () => {
//     const authToken = Cookies.get("authToken"); 
//     if (!authToken) return null;
  
//     try {
     
//       const tokenPayload = JSON.parse(atob(authToken.split(".")[1])); 
//       return tokenPayload.role; 
//     } catch (error) {
//       console.error("Error decoding token:", error);
//       return null;
//     }
//   };
//   const isProvider = () => {
//     return isAuthenticated() && getUserRole() === "PROVIDER";
//   };
//   const isAuthenticated = () => {
//     return Cookies.get("authToken") !== undefined;  
//   };

//   // Protected route component
//   const ProtectedRoute = ({ children }) => {
//     if (!isAuthenticated()) {
//       return <Navigate to="/login" />;
//     }else{

//     }
//     return children;
//   };

//   return (
//     <Router>
//       <Header />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/about" element={<AboutUs />} />
//         <Route path="/services" element={<Services />} />
//       </Routes>
//       <Footer />
//     </Router>
//   );
// };

// export default App;


import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "./components/layout/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/ContactUs";
import Footer from "./components/layout/Footer";
import AboutUs from "./pages/Aboutus";
import Services from "./pages/Services";
import { ToastContainer } from "react-toastify";
import UpdateService from "./components/services/UpdateService";
import AddServiceForm from "./components/services/AddServiceForm"
import ViewService from "./components/services/ViewService"
import ProviderDetails from "./components/services/ProviderDetails"
import  ProviderProfile  from "./components/services/ProviderProfile";
import UserProfile from "./components/User/UserProfile";
import UserDetailsForm from "./components/User/UserDetailsForm";
import UpdateUserDetailsForm from "./components/User/UpdateUserDetailsForm";
import Me from "./components/User/Me";
import ProviderDetailsUpdate from "./components/services/ProviderDetailsUpdate"
const getUserRole = () => {
  const authToken = Cookies.get("authToken");
  if (!authToken) return null;

  try {
    // Decode JWT token to get user role
    const tokenPayload = JSON.parse(atob(authToken.split(".")[1])); 
    console.log("tokenPayload role",tokenPayload.role)
    return tokenPayload.role; // Extract role
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

const isAuthenticated = () => {
  return Cookies.get("authToken") !== undefined;
};

const isProvider = () => {
  return isAuthenticated() && getUserRole() === "PROVIDER";
};

//  Protected route for "PROVIDER" role
const ProviderProtectedRoute = ({ children }) => {
  if (!isProvider()) {
    return <Navigate to="/login" />;
  }
  return children;
};

const App = () => {
  return (
    <Router>
      <ToastContainer /> 
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProviderProtectedRoute>
              <Dashboard />
            </ProviderProtectedRoute>
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/add-service" element={<AddServiceForm/>} />
        <Route path="/update-service" element ={<UpdateService/>} />
        <Route path="/view-services" element ={<ViewService/>} />
        <Route path="/provider-details/register" element ={<ProviderDetails/>} />
        <Route path="/provider-profile" element ={<ProviderProfile/>} />
        <Route path = "/user-profile" element={<UserProfile/>}/>
        <Route path="/user-details" element ={<UserDetailsForm/>} />    
        <Route path="/user-profile-update" element ={<UpdateUserDetailsForm/>} />    
        <Route path="/me" element ={<Me/>} />    
        <Route path="/provider-profile-update" element ={<ProviderDetailsUpdate/>} />    

      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
