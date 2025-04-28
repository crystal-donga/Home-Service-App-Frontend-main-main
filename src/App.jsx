import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useState, useEffect } from "react";
import Header from "./components/layout/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./components/auth/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/ContactUs";
import Footer from "./components/layout/Footer";
import AboutUs from "./pages/Aboutus";
import Services from "./pages/services";
import { ToastContainer } from "react-toastify";
import History from "./components/services/History";

import AddServiceForm from "./components/services/AddServiceForm";
import ViewService from "./components/services/ViewService";
import ProviderDetails from "./components/services/ProviderDetails";
import ProviderProfile from "./components/services/ProviderProfile";

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
    .find((row) => row.startsWith("authToken="))
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

const Protected = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return children;
};

const PublicRoute = ({ children }) => {
  if (isAuthenticated()) {
    return <Navigate to="/" />;
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
        <Route path="/" excat element={<Home />} />
        <Route path="/home" excat element={<Home />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route path="/forgot-password" excat element={<ForgotPassword />} />
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
        <Route
          path="/services"
          excat
          element={
            <Protected>
              <Services />
            </Protected>
          }
        />
        <Route
          path="/add-service"
          excat
          element={
            <Protected>
              <AddServiceForm />
            </Protected>
          }
        />

        <Route
          path="/view-services"
          excat
          element={
            <Protected>
              <ViewService />
            </Protected>
          }
        />
        <Route
          path="/provider-details/register"
          excat
          element={
            <Protected>
              <ProviderDetails />
            </Protected>
          }
        />
        <Route
          path="/provider-profile"
          excat
          element={
            <Protected>
              <ProviderProfile />
            </Protected>
          }
        />
        <Route
          path="/user-profile"
          excat
          element={
            <Protected>
              <UserProfile />
            </Protected>
          }
        />
        <Route
          path="/user-details"
          excat
          element={
            <Protected>
              <UserDetailsForm />
            </Protected>
          }
        />
        <Route
          path="/user-profile-update"
          excat
          element={
            <Protected>
              <UpdateUserDetailsForm />
            </Protected>
          }
        />
        <Route
          path="/me"
          excat
          element={
            <Protected>
              <Me />
            </Protected>
          }
        />
        <Route
          path="/provider-profile-update"
          excat
          element={
            <Protected>
              <ProviderDetailsUpdate />
            </Protected>
          }
        />
        <Route
          path="/whishlist"
          excat
          element={
            <Protected>
              <Wishlist />
            </Protected>
          }
        />
        <Route
          path="/cart"
          excat
          element={
            <Protected>
              <Cart />
            </Protected>
          }
        />
        <Route
          path="/orders"
          excat
          element={
            <Protected>
              <Orders />
            </Protected>
          }
        />
        <Route
          path="/service-history"
          excat
          element={
            <Protected>
              <History />
            </Protected>
          }
        />
        <Route
          path="/orders/:orderId"
          excat
          element={
            <Protected>
              <IndivisualOrder />
            </Protected>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
