
import { useGetProviderOfAllOrdersQuery, useUpdateOrderStatusMutation } from "../api/orderApi";
import Sidebar from "../Sidebar";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import IndivisualOrder from "../components/services/IndivisualOrder";
import Pagination from "../Pagination";

const ORDER_STATUSES = ["PENDING", "CONFIRMED", "IN_PROGRESS", "COMPLETED", "CANCELLED"];

function Dashboard() {
  const [cookies] = useCookies(["authToken"]);
  const [serviceProviderId, setServiceProviderId] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [currentPage,setCurrentPage] = useState(0);
  const itemPerPage=6;
  const navigate = useNavigate();

  const { data: orders = [], isLoading } = useGetProviderOfAllOrdersQuery(serviceProviderId, {
    skip: !serviceProviderId,
  });
  const totalPages = Math.ceil((orders?.length || 0)/itemPerPage)
  const paginationRequest = ()=>{
         const start = currentPage * itemPerPage
         const end = (currentPage+1) * itemPerPage
         return orders.slice(start,end)
  }
  useEffect(() => {
    const token = cookies.authToken;
    if (token) {
      const decoded = jwtDecode(token);
      setServiceProviderId(decoded.serviceProviderId);
    }
  }, [cookies]);

  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const handleStatus = async (e, orderId) => {
    const newStatus = e.target.value;
    try {
      await updateOrderStatus({ orderId, status: newStatus });
      console.log(`Updated status to ${newStatus}`);
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  if (isLoading) return <div className="p-6 text-lg font-medium text-gray-700">Loading...</div>;
  console.log("time",orders)
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-6">
        {selectedOrderId ? (
          <div className="mb-6">
  <div className="flex justify-between items-center mb-4">
    {/* <h2 className="text-2xl font-semibold text-gray-800">Order Details</h2> */}
    <button
      onClick={() => setSelectedOrderId(null)}
      className="text-blue-600 hover:text-blue-800 text-sm underline mt-23 ml-7"
    >
      ← Back to all orders
    </button>
  </div>
  <IndivisualOrder orderId={selectedOrderId} />
</div>
        ) : (
          <>
            <h1 className="text-3xl font-semibold text-gray-800 mb-6 mt-11">All Orders</h1>
            <div className="overflow-x-auto bg-white shadow rounded-xl">
              <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-gray-100 text-gray-700 text-left">
                  <tr>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Time</th>
                    <th className="px-6 py-3">Service</th>
                    <th className="px-6 py-3">Customer</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginationRequest().map((order) => (
                    <tr key={order.id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4">{order.scheduledDate}</td>
                      <td className="px-6 py-4">{order.scheduledTime}</td>
                      <td className="px-6 py-4">{order.serviceName}</td>
                      <td className="px-6 py-4">{order.customerName}</td>
                      <td className="px-6 py-4">
                        <select
                          defaultValue={order.status}
                          onChange={(e) => handleStatus(e, order.orderId)}
                          className="bg-gray-100 border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                          {ORDER_STATUSES.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setSelectedOrderId(order.orderId)}
                          className="text-purple-600 hover:underline font-medium"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChangePage={setCurrentPage}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
