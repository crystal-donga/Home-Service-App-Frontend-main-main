import React, { useEffect, useState } from "react";
import {
  useGetProviderOfAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../api/orderApi";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import IndivisualOrder from "./IndivisualOrder";
import Sidebar from "../../Sidebar";

const ORDER_STATUSES = [
  "PENDING",
  "CONFIRMED",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
];

export default function History() {
  const [cookies] = useCookies(["authToken"]);
  const [serviceProviderId, setServiceProviderId] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const { data: orders = [], isLoading } = useGetProviderOfAllOrdersQuery(
    serviceProviderId,
    {
      skip: !serviceProviderId,
    }
  );

  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  useEffect(() => {
    const token = cookies.authToken;
    if (token) {
      const decoded = jwtDecode(token);
      setServiceProviderId(decoded.serviceProviderId);
    }
  }, [cookies]);

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
      <Sidebar />

      <main className="flex-1 px-6 py-8 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">
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
          orders.map((order, idx) => (
            <div
              key={idx}
              className="bg-white border rounded-xl shadow p-6 space-y-4 mb-6"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">
                    Order ID: {order.orderId}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Scheduled Date: {order.scheduledDateTime.split("T")[0]}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 mr-2">
                    Status:
                  </label>
                  <select
                    defaultValue={order.status}
                    className="border rounded px-3 py-1 text-sm bg-gray-50 cursor-pointer"
                    onChange={(e) => handleStatus(e, order.orderId)}
                  >
                    {ORDER_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-md font-semibold mb-2 text-gray-700">
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

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-md font-semibold mb-2 text-gray-700">
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                <div>
                  <p>
                    <strong>Service:</strong> {order.serviceName}
                  </p>
                  <p>
                    <strong>Service ID:</strong> {order.serviceId}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Payment:</strong> {order.paymentMethod}
                  </p>
                  <p>
                    <strong>Price:</strong> ₹{order.orderPrice.toFixed(2)}
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
                    className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 transition duration-200 cursor-pointer"
                  >
                    View Details
                  </div>
                </div>
              </div>
            </div>
          ))}
      </main>
    </div>
  );
}
