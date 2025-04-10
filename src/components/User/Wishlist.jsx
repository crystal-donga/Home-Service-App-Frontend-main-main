import { useEffect, useState } from "react";
import ServiceImage from "../services/ServiceImage";
import { X ,ClipboardList} from "lucide-react";
import { toast } from "react-toastify";
export default function Wishlist() {
  const [wishlist, SetWishlist] = useState([]);

  useEffect(() => {
    const allWishlistData = JSON.parse(localStorage.getItem("Wishlist")) || [];
    console.log("all data", allWishlistData);
    SetWishlist(allWishlistData);
  }, []);
  const handleRemove = (serviceId) => {
    const updatedWishlist = wishlist.filter(
      (item) => item.serviceId !== serviceId
    );
    SetWishlist(updatedWishlist);
    localStorage.setItem("Wishlist", JSON.stringify(updatedWishlist));
  };
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
    <div className="bg-gray-200 min-h-screen p-6 mt-12">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Wishlist</h1>
      {wishlist.length === 0 ? (
        <p className="text-center text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((service) => (
            <div
              key={service.serviceId}
              className="bg-white rounded-xl shadow-md p-4 relative hover:rounded-md "
            >
              {/* Close Button */}
              <button
                onClick={() => handleRemove(service.serviceId)}
                className="absolute top-2 right-2 text-black hover:text-red-600 cursor-pointer"
                title="Remove from Wishlist"
              >
                <X size={24} /> {/* Reduced size for better look */}
              </button>

              <ServiceImage
                imageName={service.imageUrl}
                alt={service.serviceName}
                className="w-full h-40 object-cover rounded-md mb-2 mt-5 cursor-pointer"
              />
              <h3 className="text-lg font-bold text-gray-800 cursor-auto">
                {service.serviceName}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                {service.description}
              </p>
              <p className="text-sm font-semibold text-gray-700">
                Category:{" "}
                <span className="text-gray-500">{service.category}</span>
              </p>
              <p className="text-sm font-semibold text-gray-700">
                Price: <span className="text-gray-500">₹{service.price}</span>
              </p>
              <p className="text-sm font-semibold text-gray-700">
                Duration:{" "}
                <span className="text-gray-500">
                  {service.expectedDuration} minutes
                </span>
              </p>
              <p className="text-sm font-semibold text-gray-700">
                Company Name:{" "}
                <span className="text-gray-500">
                  {service.serviceProviderName}
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
          <button className="w-full flex items-center justify-center gap-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold 
           rounded-xl transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
           onClick={()=>HandleCart(service)}
           >
            <ClipboardList  size={22} />
            Book Service
          </button>
        </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
