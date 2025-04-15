import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { useState,useEffect } from "react";
import Header from "./components/layout/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/ContactUs";
import Footer from "./components/layout/Footer";
import AboutUs from "./pages/Aboutus";
import Services from "./pages/services";
import { ToastContainer } from "react-toastify";
import History from "./components/services/History";

import AddServiceForm from "./components/services/AddServiceForm"
import ViewService from "./components/services/ViewService"
import ProviderDetails from "./components/services/ProviderDetails"
import  ProviderProfile  from "./components/services/ProviderProfile";

import UserProfile from "./components/User/UserProfile";
import UserDetailsForm from "./components/User/UserDetailsForm";
import UpdateUserDetailsForm from "./components/User/UpdateUserDetailsForm";
import Me from "./components/User/Me";
import ProviderDetailsUpdate from "./components/services/ProviderDetailsUpdate";
import Wishlist from "./components/User/Wishlist";
import Cart from "./components/User/Cart";
import Orders from "./components/User/Orders";
import IndivisualOrder from "./components/services/IndivisualOrder";



//  Move this to a custom hook or utils later
const getUserRole = () => {
  const token = document.cookie
    .split("; ")
    .find(row => row.startsWith("authToken="))
    ?.split("=")[1];

  if (!token) return null;

  try {
    const tokenPayload = JSON.parse(atob(token.split(".")[1]));
    console.log("tokenPayload role", tokenPayload.role);
    return tokenPayload.role;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};




const isAuthenticated = () => {
  return document.cookie.includes("authToken=");
};

const isProvider = () => {
  return isAuthenticated() && getUserRole() === "PROVIDER";
};

// Protected route
const ProviderProtectedRoute = ({ children }) => {
  if (!isProvider()) {
    return <Navigate to="/login" />;
  }
  return children;
};


     

const App = () => {
  const [role, setRole] = useState();
  useEffect(() => {
    const userRole = getUserRole();
    setRole(userRole);
  }, []);
  return (
   
    <Router>
      <ToastContainer /> 
      <Header />
      {/* {role === "USER" && <UserSidebar />}
      {role === "PROVIDER" && <Sidebar />} */}
      <Routes>
        <Route path="/"  excat element={<Home />} />
        <Route path="/home"   excat element={<Home />} />
        <Route path="/login" excat element={<Login />} />
        <Route path="/register" excat element={<Register />} />
        <Route
          path="/dashboard"
          excat

          element={
            <ProviderProtectedRoute>
              <Dashboard />
            </ProviderProtectedRoute>
          }
        />
        <Route path="/contact" excat element={<Contact />} />
        <Route path="/about" excat element={<AboutUs />} />
        <Route path="/services" excat element={<Services />} />
        <Route path="/add-service" excat element={<AddServiceForm/>} />
       
        <Route path="/view-services" excat element ={<ViewService/>} />
        <Route path="/provider-details/register" excat element ={<ProviderDetails/>} />
        <Route path="/provider-profile"  excat element ={<ProviderProfile/>} />
        <Route path = "/user-profile" excat element={<UserProfile/>}/>
        <Route path="/user-details" excat element ={<UserDetailsForm/>} />    
        <Route path="/user-profile-update" excat element ={<UpdateUserDetailsForm/>} />    
        <Route path="/me" excat element ={<Me/>} />    
        <Route path="/provider-profile-update" excat element ={<ProviderDetailsUpdate/>} />    
        <Route path="/whishlist" excat element ={<Wishlist/>} />    
        <Route path="/cart" excat element ={<Cart/>} />    
        <Route path="/orders"  excat element ={<Orders/>} />    
        <Route path="/service-history" excat element ={<History/>} />    
        <Route path="/orders/:orderId" excat element={<IndivisualOrder/>} />

      </Routes>
      <Footer />
    </Router>
  
  );
};

export default App;
