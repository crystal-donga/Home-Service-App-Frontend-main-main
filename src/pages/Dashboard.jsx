import {
  useGetProviderOfAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../api/orderApi";

import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect, useMemo } from "react";
import IndivisualOrder from "../components/services/IndivisualOrder";

import Pagination from "../Pagination";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const ORDER_STATUSES = [
  "PENDING",
  "CONFIRMED",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
];
const STATUS_COLORS = {
  PENDING: "#facc15",
  CONFIRMED: "#4ade80",
  IN_PROGRESS: "#38bdf8",
  COMPLETED: "#10b981",
  CANCELLED: "#f87171",
};

function Dashboard() {
  useEffect(()=>{
    document.title="Dashboard"
  },[])
  const [cookies] = useCookies(["authToken"]);
  const [serviceProviderId, setServiceProviderId] = useState(null);
  const [status,setStatus] = useState();
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemPerPage = 4;
 
  const { data: orders = [], isLoading } = useGetProviderOfAllOrdersQuery(
    serviceProviderId,
    {
      skip: !serviceProviderId,
    }
  );
  console.log("Orders",orders)
  const totalPages = Math.ceil((orders?.length || 0) / itemPerPage);

  const paginationRequest = () => {
    const start = currentPage * itemPerPage;
    const end = (currentPage + 1) * itemPerPage;
    return orders.slice(start, end);
  };

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
      //setStatus(newStatus)
      console.log(`Updated status to ${newStatus}`);
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const statusDistribution = useMemo(() => {
    const map = {};
    orders.forEach((order) => {
      map[order.status] = (map[order.status] || 0) + 1;
    });
    return Object.keys(map).map((key) => ({ name: key, value: map[key] }));
  }, [orders]);

  const serviceUserMap = useMemo(() => {
    const map = {};
    orders.forEach((order) => {
      if (!map[order.items[0].serviceName])
        map[order.items[0].serviceName] = new Set();
      map[order.items[0].serviceName].add(order.customerName);
    });
    return Object.keys(map).map((service) => ({
      service,
      users: map[service].size,
    }));
  }, [orders]);

  if (isLoading)
    return (
      <div className="p-6 text-lg font-medium text-gray-700">Loading...</div>
    );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <main className="flex-1 p-6 mt-8">
        {selectedOrderId ? (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
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
            <h1 className="text-3xl font-bold text-gray-800 mb-6 mt-4">
              Dashboard Insights
            </h1>
            {/*    */}
            {/* Insights Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-white p-4 rounded-2xl shadow flex items-center justify-between">
                <div>
                  <div className="text-gray-600 text-sm">Total Orders</div>
                  <div className="text-xl font-bold text-gray-800">
                    {orders.length}
                  </div>
                </div>
                📦
              </div>
              <div className="bg-white p-5 rounded-2xl shadow flex items-center justify-between">
                <div>
                  <div className="text-gray-600 text-sm">Completed Orders</div>
                  <div className="text-xl font-bold text-green-600">
                    {orders.filter((o) => o.status === "COMPLETED").length}
                  </div>
                </div>
                ✅
              </div>
              <div className="bg-white p-5 rounded-2xl shadow flex items-center justify-between">
                <div>
                  <div className="text-gray-600 text-sm">Active Services</div>
                  <div className="text-xl font-bold text-blue-500">
                    {serviceUserMap.length}
                  </div>
                </div>
                🛠️
              </div>
            </div>

            {/* Charts */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="bg-white p-4 rounded-2xl shadow hover:bg-blue-100">
                <h2 className="text-lg font-semibold mb-4 text-gray-700 ml-4">
                  Order Status Distribution
                </h2>
                <PieChart width={450} height={250}>
                  <Pie
                    data={statusDistribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={STATUS_COLORS[entry.name] || "#ccc"}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg transition-all hover:shadow-2xl">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Users per Service
                </h2>
                <BarChart
                  width={450}
                  height={300}
                  data={serviceUserMap}
                  margin={{ top: 10, right: 30, left: 10, bottom: 100 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="service"
                    interval={0}
                    angle={-30}
                    textAnchor="end"
                    height={120}
                    tick={{ fontSize: 12, fill: "#4B5563" }}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#4B5563" }}
                    domain={[0, "dataMax + 1"]}
                    allowDecimals={false}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "10px",
                      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                    }}
                    labelStyle={{ fontWeight: "bold", color: "#374151" }}
                  />
                  <Legend />
                  <Bar
                    dataKey="users"
                    fill="#60a5fa"
                    radius={[6, 6, 0, 0]}
                    barSize={45}
                    label={{ position: "top", fill: "#3B82F6", fontSize: 12 }}
                  />
                </BarChart>
              </div>
            </div> */}
            {/* Compact Chart Cards */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
  {/* Small Pie Chart Card */}
  <div className="bg-white p-3 rounded-xl shadow-md hover:bg-blue-50 transition-all">
    <h3 className="text-base font-medium text-gray-700 text-center mb-2">
      Status Overview
    </h3>
    <div className="flex justify-center items-center ">
      <PieChart width={200} height={200}>
        <Pie
          data={statusDistribution}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={60}
          label={({ name, value }) => `${name}: ${value}`}
        >
          {statusDistribution.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={STATUS_COLORS[entry.name] || "#ccc"}
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  </div>

  {/* Small Bar Chart Card */}
  <div className="bg-white p-3 rounded-xl shadow-md hover:bg-blue-50 transition-all">
    <h3 className="text-base font-medium text-gray-700 text-center mb-2">
      Users per Service
    </h3>
    <div className="flex justify-center items-center">
      <BarChart
        width={250}
        height={200}
        data={serviceUserMap}
        margin={{ top: 5, right: 10, left: 0, bottom: 50 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="service"
          angle={-30}
          textAnchor="end"
          interval={0}
          height={60}
          tick={{ fontSize: 10, fill: "#4B5563" }}
        />
        <YAxis
          tick={{ fontSize: 10, fill: "#4B5563" }}
          allowDecimals={false}
          domain={[0, "dataMax + 1"]}
        />
        <Tooltip />
        <Bar
          dataKey="users"
          fill="#3B82F6"
          radius={[4, 4, 0, 0]}
          barSize={30}
          label={{ position: "top", fontSize: 10 }}
        />
      </BarChart>
    </div>
  </div>
</div>


            {/* Orders Table */}
            <div className="overflow-x-auto bg-white shadow rounded-2xl">
              <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-gray-100 text-gray-700 text-left">
                  <tr>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Time</th>
                    <th className="px-6 py-3">Service</th>
                    <th className="px-6 py-3">Customer</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 hover:cursor-pointer">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginationRequest().map((order) => (
                    <tr key={order.id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4">{order.scheduledDate}</td>
                      <td className="px-6 py-4">{order.scheduledTime}</td>
                      <td className="px-6 py-4">
                        {order.items[0].serviceName}
                      </td>
                      <td className="px-6 py-4">{order.customerName}</td>
                      <td className="px-6 py-4">
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
                      </td>

                      <td className="px-6 py-4">
                        <button
                          onClick={() => setSelectedOrderId(order.orderId)}
                          className="text-purple-600 hover:underline font-medium cursor-pointer"
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
