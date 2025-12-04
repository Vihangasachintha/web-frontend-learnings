import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "../../components/loading";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to view orders");
        return;
      }

      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/orders", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          setOrders(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(
            "Failed to load orders:",
            err.response?.data?.message || err.message
          );
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  // Status badge classes
  function getStatusClass(status) {
    switch (status) {
      case "pending":
        return "bg-yellow-200 text-yellow-800";
      case "processing":
        return "bg-blue-200 text-blue-800";
      case "shipped":
        return "bg-purple-200 text-purple-800";
      case "completed":
        return "bg-green-200 text-green-800";
      case "cancelled":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  }

  return (
    <div className="w-full h-full bg-primary p-6 overflow-y-auto">

      {/* Page Title */}
      <h1 className="text-3xl font-bold text-accent mb-6">Manage Orders</h1>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="overflow-x-auto bg-white border border-accent shadow-md rounded-xl p-4">

          {/* Orders Table */}
          <table className="w-full border-collapse">
            <thead className="bg-accent text-white">
              <tr>
                <th className="py-3 px-4 text-left">Order ID</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Address</th>
                <th className="py-3 px-4 text-left">Phone</th>
                <th className="py-3 px-4 text-left">Total</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-100 transition-colors"
                >
                  <td className="py-3 px-4">{order.orderId}</td>
                  <td className="py-3 px-4">{order.name}</td>
                  <td className="py-3 px-4">{order.email}</td>
                  <td className="py-3 px-4">{order.address}</td>
                  <td className="py-3 px-4">{order.phone}</td>
                  <td className="py-3 px-4 font-semibold text-accent">
                    {order.total?.toFixed(2)}
                  </td>
                  <td className="py-3 px-4">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={
                        "px-3 py-1 rounded-full text-sm font-semibold capitalize " +
                        getStatusClass(order.status)
                      }
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      )}
    </div>
  );
}
