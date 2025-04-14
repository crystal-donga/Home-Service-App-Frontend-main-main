

import React from "react";
import { Link } from "react-router-dom";

const AuthLayout = ({ children, title, subtitle, bgImage }) => {
  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      {/* Left Side - Background (Image) */}
      <div
        className="hidden lg:block lg:w-2/3 h-screen ml-15 mt-11 mb-5"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      
      {/* Right Side - Auth Form */}
      <div className="w-3/7  flex items-center justify-center p-4 mb-5 mr-5 mt-15">
        <div className="w-xl  max-w-md p-8 bg-white shadow-lg rounded-xl">
          {/* Logo */}
          <Link to="/">
            <div className="flex items-center justify-center mb-4">
              <svg
                className="h-6 w-6 text-indigo-500"
                viewBox="0 0 40 40"
                fill="currentColor"
              >
                <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6333L29.3167 10.9833L31.6667 13.3333L16.6667 28.3333Z" />
              </svg>
              <span className="ml-2 text-2xl font-bold text-gray-900">
                Home Service App
              </span>
            </div>
          </Link>

          {/* Title & Subtitle */}
          <h3 className="text-xl font-bold text-gray-900 text-center mb-2">{title}</h3>
          {subtitle && <p className="text-gray-600 text-center mb-2">{subtitle}</p>}

          {/* Auth Form */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
