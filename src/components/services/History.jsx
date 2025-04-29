import  { useEffect, useState } from "react";
import {
  useGetProviderOfAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../api/orderApi";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import IndivisualOrder from "./IndivisualOrder";

import Pagination from "../../Pagination";
const ORDER_STATUSES = [
  "PENDING",
  "CONFIRMED",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
];

export default function History() {
  useEffect(()=>{
          document.title="History"
      })
  const [cookies] = useCookies(["authToken"]);
  const [serviceProviderId, setServiceProviderId] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemPerPage = 2;
  const { data: orders = [], isLoading } = useGetProviderOfAllOrdersQuery(
    serviceProviderId,
    {
      skip: !serviceProviderId,
    }
  );
  console.log("orders",orders)
  const totalPages = Math.ceil((orders?.length || 0) / itemPerPage);
  const paginationOrders = () => {
    const start = currentPage * itemPerPage;
    const end = start + itemPerPage;
    return orders.slice(start, end);
  };
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  useEffect(() => {
    const token = cookies.authToken;
    if (token) {
      const decoded = jwtDecode(token);
      setServiceProviderId(decoded.serviceProviderId);
    }
  }, [cookies]);
  useEffect(() => {
    if (orders && orders.length > 0) {
      setCurrentPage(0); // Reset page to 0 whenever new orders are fetched
    }
  }, [orders]);
  
  const handleStatus = async (e, orderId) => {
    const newStatus = e.target.value;
    try {
      await updateOrderStatus({ orderId, status: newStatus });
      console.log(`Updated status to ${newStatus}`);
    } catch (error) {
      console.error("Failed to update status", error);
    }
};


  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* <Sidebar /> */}

      <main className="flex-1 px-6 py-8 overflow-y-auto">
        <h2 className="text-2xl font-bold mt-15">
          Service Provider Order History
        </h2>

        {isLoading && <div className="text-lg">Loading orders...</div>}

        {selectedOrderId && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={() => setSelectedOrderId(null)}
                className="text-blue-600 hover:text-blue-800 text-sm underline"
              >
                ← Back to all orders
              </button>
            </div>
            <IndivisualOrder orderId={selectedOrderId} />
          </div>
        )}

        {!selectedOrderId &&
          paginationOrders().map((order, idx) => (
            <div
              key={idx}
              className="bg-white border rounded-xl shadow p-4 space-y-3 mb-4"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-md font-semibold">
                    Order ID: {order.orderId}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Scheduled Date: {order.scheduledDate}
                  </p>
                  <p className="text-xs text-gray-500">
                    Scheduled Time: {order.scheduledTime}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mr-2">
                    Status:
                  </label>
                  
                  <select
                    defaultValue={order.status}
                    onChange={(e) => handleStatus(e, order.orderId)}
                    className={`bg-gray-100 border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 cursor-pointer
    ${order.status === "PENDING" && "text-yellow-500"}
    ${order.status === "CONFIRMED" && "text-green-500"}
    ${order.status === "IN_PROGRESS" && "text-blue-400"}
    ${order.status === "COMPLETED" && "text-green-600"}
    ${order.status === "CANCELLED" && "text-red-500"}
  `}
                  >
                    {ORDER_STATUSES.map((status) => (
                      <option
                        key={status}
                        value={status}
                        className={`${
                          status === "PENDING" && "text-yellow-500"
                        } 
                    ${status === "CONFIRMED" && "text-green-500"} 
                    ${status === "IN_PROGRESS" && "text-blue-400"} 
                    ${status === "COMPLETED" && "text-green-600"} 
                    ${status === "CANCELLED" && "text-red-500"}`}
                      >
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="text-sm font-semibold mb-1 text-gray-700">
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

                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="text-sm font-semibold mb-1 text-gray-700">
                    Service Provider
                  </h4>
                  <p>
                    <strong>Name:</strong> {order.serviceProviderName}
                  </p>
                  <p>
                    <strong>ID:</strong> {order.serviceProviderId}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-3 border-t">
                <div>
                  <p>
                    <strong>Service:</strong> {order.items[0].serviceName}
                  </p>
                  <p>
                    <strong>Service ID:</strong> {order.items[0].serviceId}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Payment:</strong> {order.paymentMethod}
                  </p>
                  <p>
                    <strong>Price:</strong> ₹{order.totalAmount}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Ordered At:</strong> {order.orderedAt}
                  </p>
                  <p>
                    <strong>Updated At:</strong> {order.updatedAt}
                  </p>
                  <div
                    onClick={() => setSelectedOrderId(order.orderId)}
                    className="inline-block mt-2 px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded shadow hover:bg-blue-700 transition cursor-pointer"
                  >
                    View Details
                  </div>
                </div>
              </div>
            </div>
          ))}
        {!selectedOrderId && orders.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChangePage={setCurrentPage}
          />
        )}
      </main>
    </div>
  );
}
