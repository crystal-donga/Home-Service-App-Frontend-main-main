import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useGetUserDetailsQuery } from "../../api/userApi";
import AvailableServiceList from "./AvailableServiceList";
import UnavailableServiceList from "./UnavailableServiceList";
import {  useNavigate } from "react-router-dom";
import { useCreateOrdersMutation } from "../../api/orderApi";
function Cart() {
  const [cookie] = useCookies(["authToken"]);
  const [cart, setCart] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [userId, setUserId] = useState();
  const [isAddressConfirmed, setIsAddressConfirmed] = useState(false);
  const navigate = useNavigate()
  const { data: userDetails } = useGetUserDetailsQuery(userId, {
    skip: !userId,
  });
  const [createOrders, { isLoading }] = useCreateOrdersMutation();


  useEffect(() => {
    const token = cookie.authToken;
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (!decoded.userId) {
          toast.error("User Not Found");
        } else {
          setUserId(decoded.userId);
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
  }, [cookie]);

  useEffect(() => {
    const allAddToCartServices = JSON.parse(localStorage.getItem("Cart")) || [];
    setCart(allAddToCartServices);
  }, []);

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleRemove = (serviceId) => {
    const updatedCart = cart.filter((service) => service.serviceId !== serviceId);
    setCart(updatedCart);
    localStorage.setItem("Cart", JSON.stringify(updatedCart));
  };
  const availableServices = cart.filter((service) => service.status);
  const unavailableServices = cart.filter((service) => service.status === false);
  console.log("Avalibale",availableServices)
  console.log("Unavalibale",unavailableServices)
  const handlePayment=async()=>{
    alert("payment is processing")
        try{
              for(const service of availableServices){
                console.log("userid",userId)
                console.log("serviceid",service.serviceId)
                await createOrders({
                  userId: userId,
                  servicesId: service.serviceId,
            
                  scheduledDateTime: new Date().toISOString(), // Format: ISO string
                  orderPrice: service.price,
                  paymentMethod: "CARD"
                }).unwrap()
              }    
        
           toast.success("Order(s) placed successfully");
           localStorage.removeItem("Cart");
           navigate("/orders");

            } 
          catch(error){
            console.error("Order failed:", error);
            toast.error("Failed to place order. Try again.");
         }
    
    navigate("/orders")
  }
  const totalAmount = () => {
    return cart.reduce((total, service) => {
      return service.status ? total + service.price : total;
    }, 0);
  };

  


 // console.log("status")
  console.log("unavalible",unavailableServices)
  return (
    <div className="bg-gray-200 mt-18">
      <div className="max-w-3xl mx-auto p-6">
        {/* Stepper UI */}
        <div className="flex justify-between mb-6">
          {["Services", "Address", "Payment"].map((label, index) => (
            <div
              key={index}
              className={`flex-1 text-center pb-2 font-semibold cursor-pointer transition-all duration-300
                ${
                  currentStep === index + 1
                    ? "border-b-4 border-blue-600 text-blue-600"
                    : currentStep > index + 1
                    ? "border-b-4 border-green-600 text-green-600"
                    : "border-b-4 border-gray-300 text-gray-500"
                }`}
              onClick={() => setCurrentStep(index + 1)}
            >
              {index + 1}. {label}
            </div>
          ))}
        </div>

        {/* Step Content */}
        {currentStep === 1 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Selected Services</h2>
            {cart.length === 0 ? (
              <p>No services in cart.</p>
            ) : (
              <>
                {availableServices.length > 0 && (
                  <AvailableServiceList
                    services={availableServices}
                    onRemove={handleRemove}
                    totalAmount={totalAmount}
                  />
                )}
                {unavailableServices.length > 0 && (
                  <UnavailableServiceList
                    services={unavailableServices}
                    onRemove={handleRemove}
                  />
                )}
              </>
            )}
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Confirm Your Address</h2>
            {userDetails ? (
              <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                <p className="text-gray-700"><strong>Address:</strong> {userDetails.address}</p>
                <p className="text-gray-700"><strong>City:</strong> {userDetails.city}</p>
                <p className="text-gray-700"><strong>State:</strong> {userDetails.state}</p>
                <p className="text-gray-700"><strong>Country:</strong> {userDetails.country}</p>
                <p className="text-gray-700"><strong>Zipcode:</strong> {userDetails.zipCode}</p>
                <div className="mt-4 flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="confirm-address"
                    className="form-checkbox rounded-full w-5 h-5 text-blue-600"
                    checked={isAddressConfirmed}
                    onChange={() => setIsAddressConfirmed(!isAddressConfirmed)}
                  />
                  <label htmlFor="confirm-address" className="text-gray-700 font-medium">
                    I confirm this is my address
                  </label>
                </div>
              </div>
            ) : (
              <p className="text-red-600">Unable to fetch address details.</p>
            )}
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Payment</h2>
            <p>Stripe payment section goes here.</p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-6 flex justify-between">
          {currentStep > 1 && (
            <button
              onClick={handleBack}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded cursor-pointer"
            >
              Back
            </button>
          )}
          {currentStep < 3 ? (
            <button
              onClick={handleNext}
              className={`px-4 py-2 rounded cursor-pointer ${
                currentStep === 2 && !isAddressConfirmed
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-blue-600 text-white"
              }`}
              disabled={currentStep === 2 && !isAddressConfirmed}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handlePayment}
              className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
            >
              Pay Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;