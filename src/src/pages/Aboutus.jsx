import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-700 via-indigo-800 to-blue-900 text-white p-6">
      <div className="max-w-4xl bg-white bg-opacity-40 backdrop-blur-lg shadow-xl rounded-3xl p-10 text-center border border-white border-opacity-30">
        <h2 className="text-5xl font-extrabold text-gray-900 mb-6 drop-shadow-lg">About Us</h2>
        <p className="text-lg text-gray-800 mb-6 leading-relaxed font-medium">
          Welcome to <span className="text-indigo-600 font-bold">Home Service App</span>, your go-to platform for finding top-rated home service providers. We strive to connect customers with skilled professionals for a seamless service experience.
        </p>

        <div className="grid md:grid-cols-2 gap-6 text-left mt-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Mission</h3>
            <p className="text-gray-700 font-medium">To simplify home services by providing a reliable and efficient platform for users and professionals.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Why Choose Us?</h3>
            <p className="text-gray-700 font-medium">We ensure quality, trust, and convenience in every service we offer, making home maintenance hassle-free.</p>
          </div>
        </div>

        <button className="mt-8 px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg shadow-lg transition-transform transform hover:scale-105">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default AboutUs;
