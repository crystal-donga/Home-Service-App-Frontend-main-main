
import React, { useState } from "react";
import PropTypes from "prop-types";
import ServiceImage from "../components/services/ServiceImage";
import { ClipboardList , Heart,HeartIcon, ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";


function AllServiceCard({ service = {} }) {
  const[isWishlisted,SetIsWishlisted] = useState(false)
 
  const handleWishList = () => {
    const storedWishlist = JSON.parse(localStorage.getItem('Wishlist')) || [];
    let updateWishlist;
  
    if (isWishlisted) {
      updateWishlist = storedWishlist.filter(item => item.serviceId  !== service.serviceId);
      toast.info("Removed from wishlist");
    } else {
      updateWishlist = [...storedWishlist, service];
      toast.success("Added to wishlist");
    }
  
    console.log("Updated Wishlist:", updateWishlist);
    localStorage.setItem('Wishlist', JSON.stringify(updateWishlist));
    SetIsWishlisted(!isWishlisted);

    }
    const HandleCart=(service)=>{
      const existingCart = JSON.parse(localStorage.getItem("Cart")) || [];
      const alredyExisting = existingCart.find((item) => item.serviceId === service.serviceId);
      if (alredyExisting) {
          toast.info("Service already exists in cart");
          return;
          } 
          const updateCart =[...existingCart,service]
          localStorage.setItem("Cart", JSON.stringify(updateCart));
          toast.info("Service add to Cart")
         
    }
  return (
    <div className="p-4 ">
      <ServiceImage
        imageName={service.imageUrl}
        alt={service.serviceName}
        className="w-full h-40 object-cover rounded-md mb-2 transition-all duration-300 hover:scale-90"
      />

      {/* Wishlist Button (below image, right corner) */}
      {/* <button className="text-white hover:text-gray-200">
              <Heart size={20} />
            </button> */}
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
          onClick={()=>HandleCart(service)}
          >
            <ShoppingCart  size={22} />
          Add to Booking
          </button>
        </div>
      </div>
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
