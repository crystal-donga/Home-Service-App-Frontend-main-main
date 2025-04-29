import React, { useEffect, useState } from "react";
import {
  useGetAllOrdersQuery,
  useGetAllOrderByUserIdQuery,
  useDeleteOrderMutation,
} from "../../api/orderApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IndivisualOrder from "../services/IndivisualOrder";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
const getStatusClass = (status) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-800";
    case "CONFIRMED":
      return "bg-blue-100 text-blue-800";
    case "IN_PROGRESS":
      return "bg-purple-100 text-purple-800";
    case "COMPLETED":
      return "bg-green-100 text-green-800";
    case "CANCELLED":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function Orders() {
  useEffect(()=>{
      document.title="My Orders"
    },[])
  const[userId,setUserId] = useState()
  //const { data: getAllOrders, isSuccess } = useGetAllOrdersQuery();
  const{data:getAllOrders,isSuccess} = useGetAllOrderByUserIdQuery(userId,{
    skip:!userId
  })
  const [cookies] = useCookies(["authToken"]);
  console.log("gel all orders", getAllOrders);
  const [deleteOrder] = useDeleteOrderMutation();
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  useEffect(()=>{
   const token = cookies.authToken;
   if(token){
    const decoded = jwtDecode(token)
    setUserId(decoded.userId)

   }
  },[cookies])

  
  const handleCancelOrder = async (orderId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    if (!confirmed) return;

    try {
      await deleteOrder(orderId).unwrap();
      toast.success("Order is successfully cancelled");
      console.log(`Order ${orderId} cancelled successfully.`);
    } catch (err) {
      toast.error("Failed to cancel order");
      console.error("Failed to cancel order", err);
    }
  };

  if (!isSuccess) return <div className="p-6">Loading orders...</div>;

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-3xl font-bold mb-4">All Orders</h2>

      {/* Conditionally render IndivisualOrder */}
      {selectedOrderId && (
        <div className="mb-1">
          <div className="flex justify-start mb-2 ml-35">
            <button
              onClick={() => setSelectedOrderId(null)}
              className="text-sm text-blue-600 underline cursor-pointer"
            >
              Back to all orders
            </button>
          </div>
          <IndivisualOrder orderId={selectedOrderId} />
        </div>
      )}

      {/* Orders List */}
      {!selectedOrderId &&
        getAllOrders.map((order, index) => (
          <div
            key={index}
            className="border rounded-2xl shadow p-6 bg-white space-y-4 hover:bg-gray-50 transition cursor-pointer"
            onClick={() => setSelectedOrderId(order.orderId)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">
                  Order ID: {order.orderId}
                </h3>
                <p className="text-sm text-purple-600">
                  Scheduled Date: {order.scheduledDate}
                </p>

                <p className="text-sm text-purple-600">
                  Scheduled Time: {order.scheduledTime}
                </p>
              </div>
              <div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="text-lg font-semibold mb-2 text-gray-800">
                  Customer
                </h4>
                <p>
                  <strong>Name:</strong> {order.customerName}
                </p>
                <p>
                  <strong>ID:</strong> {order.customerId}
                </p>
                <p>
                  <strong>Phone:</strong> {order.customerNumber}
                </p>
                <p>
                  <strong>Address:</strong> {order.address}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="text-lg font-semibold mb-2 text-gray-800">
                  Service Provider
                </h4>
                <p>
                  <strong>Name:</strong> {order.serviceProviderName}
                </p>
                <p>
                  <strong>Name:</strong> {order.serviceProviderNumber}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
              <div>
                <p className="text-gray-600">
                  <strong>Service:</strong> {order.items[0]?.serviceName}
                </p>
                {/* <p className="text-gray-600"><strong>Service ID:</strong> {order.serviceId}</p> */}
              </div>
              <div>
                <p className="text-gray-600">
                  <strong>Payment Method:</strong> {order.paymentMethod}
                </p>
                <p className="text-gray-600">
                  <strong>Price:</strong> ₹{order.totalAmount}
                </p>
                <p className="text-gray-600">
                  <strong>Payment Status:</strong>
                  <span
                    className={
                      order.paymentStatus === "UNPAID"
                        ? "text-red-600"
                        : "text-green-600"
                    }
                  >
                    {" "}
                    {order.paymentStatus}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-gray-600">
                  <strong>Ordered At:</strong> {order.orderedAt}
                </p>
                {order.updatedAt && (<p className="text-gray-600">
                  <strong>Updated At:</strong>{" "}
                  {order.updatedAt }
                </p>
              )}
                
              </div>
            </div>

            {/* Cancel Button (doesn't propagate click to detail view) */}
            {order.status !== "CANCELLED" && (
              <div onClick={(e) => e.stopPropagation()}>
                <button
                  className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                  onClick={() => handleCancelOrder(order.orderId)}
                >
                  Cancel Order
                </button>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}
