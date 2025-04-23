// // import React from 'react'
// // import { useIndivisualOrderQuery } from '../../api/orderApi'
// // export default function IndivisualOrder(orderId) {
// //     const{data:order} = useIndivisualOrderQuery(orderId,{
// //         skip: !orderId,
// //     })
// //   return (
// //     <div>
// //       //print order
// //     </div>
// //   )
// // }
// import React from 'react';
// import { useIndivisualOrderQuery } from '../../api/orderApi';
// import Sidebar from '../../Sidebar';
// import { useParams } from 'react-router-dom';
// export default function IndivisualOrder({orderId}) {
//    // const {orderId} =useParams()
//   const { data: order, isLoading } = useIndivisualOrderQuery(orderId, {
//     skip: !orderId,
//   });
//  console.log("indivisual order",order)
//   if (isLoading) return <div>Loading individual order...</div>;
//   if (!order) return <div>No order found.</div>;

//   return (
//     <div className="flex">
//           <Sidebar />
//     <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Details</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="space-y-2">
//           <h3 className="text-lg font-semibold text-blue-700">Customer Information</h3>
//           <p><strong>Name:</strong> {order.customerName}</p>
//           <p><strong>Phone:</strong> {order.customerNumber}</p>
//           <p><strong>Address:</strong> {order.address}</p>
//         </div>

//         <div className="space-y-2">
//           <h3 className="text-lg font-semibold text-blue-700">Service Details</h3>
//           <p><strong>Service:</strong> {order.serviceName}</p>
//           <p><strong>Provider:</strong> {order.serviceProviderName}</p>
//           <p><strong>Service ID:</strong> {order.serviceId}</p>
//         </div>

//         <div className="space-y-2">
//           <h3 className="text-lg font-semibold text-blue-700">Order Info</h3>
//           <p><strong>Order ID:</strong> {order.orderId}</p>
//           <p><strong>Status:</strong> {order.status}</p>
//           <p><strong>Ordered At:</strong> {order.orderedAt}</p>
//           <p><strong>Last Updated:</strong> {order.updatedAt}</p>
//         </div>

//         <div className="space-y-2">
//           <h3 className="text-lg font-semibold text-blue-700">Scheduling & Payment</h3>
//           <p><strong>Scheduled Date:</strong> {order.scheduledDateTime.split("T")[0]}</p>
//           <p><strong>Scheduled Time:</strong> {order.scheduledDateTime.split("T")[1].split(".")[0]}</p>
//           <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
//           <p><strong>Price:</strong> ₹{order.orderPrice.toFixed(2)}</p>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// };
import React from 'react';
import { useIndivisualOrderQuery } from '../../api/orderApi';

export default function IndivisualOrder({ orderId }) {
  const { data: order, isLoading } = useIndivisualOrderQuery(orderId, {
    skip: !orderId,
  });
  console.log("orders",order)
  if (isLoading) return <div className="p-6 text-gray-700">Loading individual order...</div>;
  if (!order) return <div className="p-6 text-gray-700">No order found.</div>;

  return (
    <div className=" flex min-h-screen bg-gray-50 flex items-start justify-center p-6 mt-1">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">Order Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Customer Info */}
          <section>
            <h3 className="text-xl font-semibold text-blue-700 mb-2">Customer Information</h3>
            <ul className="space-y-1">
              <li><span className="text-gray-600">Name:</span> <span className="text-black">{order.customerName}</span></li>
              <li><span className="text-gray-600">Phone:</span> <span className="text-black">{order.customerNumber}</span></li>
              <li><span className="text-gray-600">Address:</span> <span className="text-black">{order.address}</span></li>
            </ul>
          </section>

          {/* Service Info */}
          <section>
            <h3 className="text-xl font-semibold text-blue-700 mb-2">Service Details</h3>
            <ul className="space-y-1">
              <li><span className="text-gray-600">Service:</span> <span className="text-black">{order.items[0].serviceName}</span></li>
              <li><span className="text-gray-600">Provider:</span> <span className="text-black">{order.serviceProviderName}</span></li>
              <li><span className="text-gray-600">Provider Number:</span> <span className="text-black">{order.serviceProviderNumber}</span></li>
            </ul>
          </section>

          {/* Order Info */}
          <section>
            <h3 className="text-xl font-semibold text-blue-700 mb-2">Order Info</h3>
            <ul className="space-y-1">
              <li><span className="text-gray-600">Order ID:</span> <span className="text-black">{order.orderId}</span></li>
              <li><span className="text-gray-600">Status:</span> <span className="text-black">{order.status}</span></li>
              <li><span className="text-gray-600">Ordered At:</span> <span className="text-black">{new Date(order.orderedAt).toLocaleString()}</span></li>
              <li><span className="text-gray-600">Last Updated:</span> <span className="text-black">{new Date(order.updatedAt).toLocaleString()}</span></li>
            </ul>
          </section>

          {/* Scheduling & Payment */}
          <section>
            <h3 className="text-xl font-semibold text-blue-700 mb-2">Scheduling & Payment</h3>
            <ul className="space-y-1">
              <li><span className="text-gray-600">Scheduled Date:</span> <span className="text-black">{order.scheduledDate}</span></li>
              <li><span className="text-gray-600">Scheduled Time:</span> <span className="text-black">{order.scheduledTime}</span></li>
              <li><span className="text-gray-600">Payment Method:</span> <span className="text-black">{order.paymentMethod}</span></li>
              <li><span className="text-gray-600">Price:</span> <span className="text-black">₹{order.totalAmount}</span></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
