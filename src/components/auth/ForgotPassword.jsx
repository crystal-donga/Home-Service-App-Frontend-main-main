import React, { useState } from "react";
import {
  useGenerateOtpMutation,
  useVerifyOtpMutation,
  useChangePasswordMutation
} from "../../api/forgotPasswordApi";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword,setNewPassword] = useState("")
  const [generateOtp] = useGenerateOtpMutation();
  const [verifyOtp] = useVerifyOtpMutation();
  const [changePassword] = useChangePasswordMutation()
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [showEmailAndPasswordField, setShowEmailAndPasswordField] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const navigate = useNavigate()
  const handleGenerateOTP = async (e) => {
    e.preventDefault();

    console.log("Generate OTP for:", email);
    try {
      await generateOtp({ email }).unwrap();
      setShowOtpField(true);
    } catch (error) {
      console.error("Failed to generate OTP:", error);
    }
  };
  const handleVerifyOTP = async () => {
    try {
      const response = await verifyOtp({ email, otp }).unwrap();
      console.log(response);
      setResetToken(response.resetToken);
      setShowEmailAndPasswordField(true);
      console.log(resetToken);
    } catch (error) {
      console.error("Failed to generate OTP:", error);
    }
  };

  const handleChangePassword=async()=>{
    try {
        console.log("password ,email,token",email,newPassword,resetToken)
        await changePassword({email,newPassword,resetToken}).unwrap();
        console.log("Password changed successfully");
        alert("Password changed successfully")
        navigate("/login")
    } catch (error) {
        console.error("Failed to change password:", error);
        alert("Failed to reset password. Please try again.");
    }

  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Forgot Password
        </h2>
        <form onSubmit={handleGenerateOTP}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="you@example.com"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            Generate OTP
          </button>
        </form>
        {showOtpField && (
          <div className="mt-6">
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700"
            >
              Enter OTP
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter the OTP sent to your email"
            />
            <button
              type="button"
              onClick={handleVerifyOTP}
              className="mt-4 w-full bg-green-600 hover:bg-green-500 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              Verify OTP
            </button>
          </div>
        )}

        {showEmailAndPasswordField && (
          <div className="mt-6">
            <div className="mb-4">
              <label
                htmlFor="emailField"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="emailField"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="you@example.com"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your new password"
              />
            </div>
            <button
              type="button"
              onClick={handleChangePassword}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              Change Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
