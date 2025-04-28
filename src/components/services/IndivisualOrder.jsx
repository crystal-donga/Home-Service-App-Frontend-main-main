
import React, { useEffect, useState } from 'react';
import { useIndivisualOrderQuery,useUpdatePaymentStatusMutation } from '../../api/orderApi';

export default function IndivisualOrder({ orderId }) {
  const[userRole,setUserRole] = useState();
  const[serviceProviderId,setServiceProviderId] = useState()
 // const [localPaymentStatus, setLocalPaymentStatus] = useState('');

  const { data: order, isLoading,refetch } = useIndivisualOrderQuery(orderId, {
    skip: !orderId,
  });
  const [updatePaymentStatus] = useUpdatePaymentStatusMutation()
  useEffect(()=>{
   const item = localStorage.getItem("user")
   if(item){
    const user = JSON.parse(item)
    console.log("USER",user.role)
    setUserRole(user.role);
    setServiceProviderId(user.serviceProviderId)
   }
  
  },[])
  useEffect(()=>{
  if(order){
    //setLocalPaymentStatus(order.paymentStatus);
  }
  },[order])
  console.log("orders",order)
  if (isLoading) return <div className="p-6 text-gray-700">Loading individual order...</div>;
  if (!order) return <div className="p-6 text-gray-700">No order found.</div>;
  const handleStatusChagnes = async (e) => {
    const value = e.target.value;
    //setLocalPaymentStatus(value);
    console.log("status",value)
    try {
      const response = await updatePaymentStatus({
        orderId: order.orderId,
        serviceProviderId,
        paymentStatus: value,
      }).unwrap(); // unwrap to handle fulfilled/rejected
      await refetch();
      console.log("Payment status updated:", response);
      // Optionally, refetch the order or show a success message
    } catch (error) {
      console.error("Failed to update payment status", error);
    }
  };
  
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
                 {/* Payment Status */}
    {userRole === "PROVIDER" && order.paymentStatus  === "UNPAID" && order.paymentMethod === "COD" ? (
      <li className="flex items-center gap-2">
        <span className="text-gray-600">Payment Status:</span>
        <select 
          className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none"
          onChange={handleStatusChagnes}
          value={order.paymentStatus}
        >
          <option value="UNPAID">Unpaid</option>
          <option value="PAID">Paid</option>
        </select>
      </li>
    ) : (
      <li><span className="text-gray-600">Payment Status:</span> <span className="text-black">{order.paymentStatus}</span></li>
    )}
              <li><span className="text-gray-600">Price:</span> <span className="text-black">₹{order.totalAmount}</span></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
