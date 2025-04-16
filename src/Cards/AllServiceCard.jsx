
import  { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ServiceImage from "../components/services/ServiceImage";
import {  Heart,HeartIcon, ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";
import { Dialog } from "@headlessui/react";
import { useWishlist } from "../context/WishlistContext";
function AllServiceCard({ service = {} }) {
 
  const [isOpen, setIsOpen] = useState(false); 
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");

  

  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(service.serviceId);

  const handleWishList = () => {
    const added = toggleWishlist(service);
    toast[added ? "success" : "info"](
      added ? "Added to wishlist" : "Removed from wishlist",
      { autoClose: 500 }
    );
  };
    const HandleCart=(service)=>{
      if (!scheduleDate || !scheduleTime) {
        toast.error("Please select both date and time");
        return;
      }
      const existingCart = JSON.parse(localStorage.getItem("Cart")) || [];
      const alredyExisting = existingCart.find((item) => item.serviceId === service.serviceId);
      if (alredyExisting) {
          toast.info("Service already exists in cart",  { autoClose: 500 });
          return;
          } 
          const updateCart =[...existingCart,{
            ...service,
            scheduleDate,
            scheduleTime,
          },]
          localStorage.setItem("Cart", JSON.stringify(updateCart));
          toast.info("Service add to Cart with schedule",  { autoClose: 500 })
          setIsOpen(false); 
          setScheduleDate("");
          setScheduleTime("");
         
    }
  return (
    <div className="p-4 ">
      <ServiceImage
        imageName={service.imageUrl}
        alt={service.serviceName}
        className="w-full h-40 object-cover rounded-md mb-2 transition-all duration-300 hover:scale-90"
      />
       {/* <h1>crystal</h1> */}
    
      <span className="flex justify-end mb-2">
        <button className="text-bold-black hover:text-pink-800 cursor-pointer" onClick={handleWishList}>
        {isWishlisted ? (
            <HeartIcon fill="red" stroke="red" size={20} />
           
          ) : (
            <Heart size={20} />
          )}
        </button>
      </span>
      <div className="cursor-auto">
        <h3 className="text-xl font-bold text-gray-800 ">
          {service.serviceName || "Unnamed Service"}
        </h3>
        <p className="text-gray-500 text-sm font-semibold">
          {service.description || "No description available"}
        </p>
        <p className="text-gray-800 font-semibold mt-2">
          Category:{" "}
          <span className="text-gray-500">
            {service.category || "Uncategorized"}
          </span>
        </p>
        <p className="text-gray-800 font-semibold mt-1">
          Price:{" "}
          <span className="text-gray-500">
            {service.price ? `₹${service.price}` : "Not specified"}
          </span>
        </p>
        <p className="text-gray-800 text-sm font-semibold">
          Duration:{" "}
          <span className="text-gray-500">
            {service.expectedDuration
              ? `${service.expectedDuration} minutes`
              : "Not specified"}
          </span>
        </p>
        <p className="text-gray-800 font-semibold mt-1">
          Company Name:{" "}
          <span className="text-gray-500">
            {service.serviceProviderName || "Unknown provider"}
          </span>
        </p>
        <p
          className={`text-sm font-semibold mt-2 ${
            service.status ? "text-green-600" : "text-red-600"
          }`}
        >
          {service.status ? "Available" : "Unavailable"}
        </p>

        {/* Add to Booking Button */}
        <div className="mt-4">
          <button className="w-full flex items-center justify-center gap-3 px-4 py-2 
          bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold rounded-xl 
          transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
          onClick={() => setIsOpen(true)}
          >
            <ShoppingCart  size={22} />
          Add to Booking
          </button>
        </div>
      </div>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <Dialog.Title className="text-xl font-bold mb-4">Schedule Booking</Dialog.Title>

            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Select Date</label>
                <input
                  type="date"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Select Time</label>
                <input
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button onClick={() => setIsOpen(false)} className="px-4 py-2 border rounded">
                  Cancel
                </button>
                <button
                  onClick={()=>HandleCart(service)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}

AllServiceCard.propTypes = {
  service: PropTypes.shape({
    imageUrl: PropTypes.string,
    serviceName: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    expectedDuration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    serviceProviderName: PropTypes.string,
    status: PropTypes.bool,
  }),
};

export default AllServiceCard;
