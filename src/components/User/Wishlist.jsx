// import { useEffect, useState } from "react";
// import ServiceImage from "../services/ServiceImage";
// import { X ,ClipboardList} from "lucide-react";
// import { toast } from "react-toastify";
// import { Dialog } from "@headlessui/react";
// export default function Wishlist() {
//   const [wishlist, SetWishlist] = useState([]);
//   const [isOpen, setIsOpen] = useState(false); 
//   const [scheduleDate, setScheduleDate] = useState("");
//   const [scheduleTime, setScheduleTime] = useState("");
//   useEffect(() => {
//     const allWishlistData = JSON.parse(localStorage.getItem("Wishlist")) || [];
//     console.log("all data", allWishlistData);
//     SetWishlist(allWishlistData);
//   }, []);
//   const handleRemove = (serviceId) => {
//     const updatedWishlist = wishlist.filter(
//       (item) => item.serviceId !== serviceId
//     );
//     SetWishlist(updatedWishlist);
//     localStorage.setItem("Wishlist", JSON.stringify(updatedWishlist));
//   };
//   const HandleCart=(service)=>{
//     if (!scheduleDate || !scheduleTime) {
//       toast.error("Please select both date and time");
//       return;
//     }
//     const existingCart = JSON.parse(localStorage.getItem("Cart")) || [];
//     const alredyExisting = existingCart.find((item) => item.serviceId === service.serviceId);
//     if (alredyExisting) {
//         toast.info("Service already exists in cart");
//         return;
//         } 
//         const updateCart =[...existingCart,{
//           ...service,
//           scheduleDate,
//           scheduleTime,
//         },]
//         localStorage.setItem("Cart", JSON.stringify(updateCart));
//         toast.info("Service add to Cart")
       
//   }
//   return (
//     <div className="bg-gray-200 min-h-screen p-6 mt-12">
//       <h1 className="text-2xl font-bold text-gray-800 mb-6">My Wishlist</h1>
//       {wishlist.length === 0 ? (
//         <p className="text-center text-gray-500">Your wishlist is empty.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {wishlist.map((service) => (
//             <div
//               key={service.serviceId}
//               className="bg-white rounded-xl shadow-md p-4 relative hover:rounded-md "
//             >
//               {/* Close Button */}
//               <button
//                 onClick={() => handleRemove(service.serviceId)}
//                 className="absolute top-2 right-2 text-black hover:text-red-600 cursor-pointer"
//                 title="Remove from Wishlist"
//               >
//                 <X size={24} /> {/* Reduced size for better look */}
//               </button>

//               <ServiceImage
//                 imageName={service.imageUrl}
//                 alt={service.serviceName}
//                 className="w-full h-40 object-cover rounded-md mb-2 mt-5 cursor-pointer"
//               />
//               <h3 className="text-lg font-bold text-gray-800 cursor-auto">
//                 {service.serviceName}
//               </h3>
//               <p className="text-sm text-gray-600 mb-1">
//                 {service.description}
//               </p>
//               <p className="text-sm font-semibold text-gray-700">
//                 Category:{" "}
//                 <span className="text-gray-500">{service.category}</span>
//               </p>
//               <p className="text-sm font-semibold text-gray-700">
//                 Price: <span className="text-gray-500">₹{service.price}</span>
//               </p>
//               <p className="text-sm font-semibold text-gray-700">
//                 Duration:{" "}
//                 <span className="text-gray-500">
//                   {service.expectedDuration} minutes
//                 </span>
//               </p>
//               <p className="text-sm font-semibold text-gray-700">
//                 Company Name:{" "}
//                 <span className="text-gray-500">
//                   {service.serviceProviderName}
//                 </span>
//               </p>
//               <p
//                 className={`text-sm font-semibold mt-2 ${
//                   service.status ? "text-green-600" : "text-red-600"
//                 }`}
//               >
//                 {service.status ? "Available" : "Unavailable"}
//               </p>
//                 {/* Add to Booking Button */}
//         <div className="mt-4">
//           <button className="w-full flex items-center justify-center gap-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold 
//            rounded-xl transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
//            onClick={()=>HandleCart(service)}
//            >
//             <ClipboardList  size={22} />
//             Book Service
//           </button>
//         </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import ServiceImage from "../services/ServiceImage";
import { X, ClipboardList } from "lucide-react";
import { toast } from "react-toastify";
import { Dialog } from "@headlessui/react";
import { useWishlist } from "../../context/WishlistContext";
export default function Wishlist() {
  const { wishlist, toggleWishlist } = useWishlist(); 
  //const [wishlist, SetWishlist] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");

  const handleRemove = (serviceId) => {
    const serviceToRemove = wishlist.find((item) => item.serviceId === serviceId);
    if (serviceToRemove) {
      toggleWishlist(serviceToRemove); //
    }
  };

  const openBookingDialog = (service) => {
    setSelectedService(service);
    setIsOpen(true);
  };

  const handleBooking = () => {
    if (!scheduleDate || !scheduleTime) {
      toast.error("Please select both date and time");
      return;
    }

    const existingCart = JSON.parse(localStorage.getItem("Cart")) || [];
    const alredyExisting = existingCart.find((item) => item.serviceId === selectedService.serviceId);

    if (alredyExisting) {
      toast.info("Service already exists in cart",  { autoClose: 500 });
      return;
    }

    const updatedCart = [
      ...existingCart,
      {
        ...selectedService,
        scheduleDate,
        scheduleTime,
      },
    ];

    localStorage.setItem("Cart", JSON.stringify(updatedCart));
    toast.success("Service added to Cart",  { autoClose: 500 });

    // Close dialog and reset
    setIsOpen(false);
    setScheduleDate("");
    setScheduleTime("");
    setSelectedService(null);
  };

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
              className="bg-white rounded-xl shadow-md p-4 relative hover:rounded-md"
            >
              <button
                onClick={() => handleRemove(service.serviceId)}
                className="absolute top-2 right-2 text-black hover:text-red-600 cursor-pointer"
                title="Remove from Wishlist"
              >
                <X size={24} />
              </button>

              <ServiceImage
                imageName={service.imageUrl}
                alt={service.serviceName}
                className="w-full h-40 object-cover rounded-md mb-2 mt-5 cursor-pointer"
              />
              <h3 className="text-lg font-bold text-gray-800">{service.serviceName}</h3>
              <p className="text-sm text-gray-600 mb-1">{service.description}</p>
              <p className="text-sm font-semibold text-gray-700">
                Category: <span className="text-gray-500">{service.category}</span>
              </p>
              <p className="text-sm font-semibold text-gray-700">
                Price: <span className="text-gray-500">₹{service.price}</span>
              </p>
              <p className="text-sm font-semibold text-gray-700">
                Duration: <span className="text-gray-500">{service.expectedDuration} minutes</span>
              </p>
              <p className="text-sm font-semibold text-gray-700">
                Company Name:{" "}
                <span className="text-gray-500">{service.serviceProviderName}</span>
              </p>
              <p
                className={`text-sm font-semibold mt-2 ${
                  service.status ? "text-green-600" : "text-red-600"
                }`}
              >
                {service.status ? "Available" : "Unavailable"}
              </p>

              {/* Book Button */}
              <div className="mt-4">
                <button
                  className="w-full flex items-center justify-center gap-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold 
                   rounded-xl transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
                  onClick={() => openBookingDialog(service)}
                >
                  <ClipboardList size={22} />
                  Book Service
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Booking Dialog */}
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
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setSelectedService(null);
                  }}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBooking}
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
