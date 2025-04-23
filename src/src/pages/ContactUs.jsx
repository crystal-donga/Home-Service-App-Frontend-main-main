import React from "react";

const Contact = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-2xl flex max-w-4xl w-full overflow-hidden">
                
                {/* Left Side - Illustration */}
                <div className="hidden md:flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 w-1/2 p-6">
                    <img
                        src="/assets/images/workspace.jpg" 
                        alt="Contact Us"
                        className="max-w-full h-auto drop-shadow-lg"
                    />
                </div>

                {/* Right Side - Contact Form */}
                <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
                    <div className="flex flex-col items-center mb-6">
                        <span className="text-3xl text-indigo-600">📩</span>
                        <h2 className="text-2xl font-bold text-gray-900 mt-2">
                            Get in Touch
                        </h2>
                        <p className="text-center text-gray-500 text-sm">
                            Fill out the form and we'll get back to you ASAP!
                        </p>
                    </div>

                    {/* Form Container */}
                    <div className="bg-blue-100 rounded-xl p-6 shadow-inner">
                        <form className="space-y-5">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 border rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 text-sm"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-3 border rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 text-sm"
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                    Message
                                </label>
                                <textarea
                                    className="w-full px-4 py-3 border rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 text-sm"
                                    rows="4"
                                    placeholder="Write your message here..."
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
