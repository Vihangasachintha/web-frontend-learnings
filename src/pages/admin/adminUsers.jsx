import axios from "axios";
import { useState, useEffect } from "react";
import Loading from "../../components/loading";
import toast from "react-hot-toast";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const columnWidths = [240, 180, 260, 140, 120, 160];

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first.");
      setIsLoading(false);
      return;
    }

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/admin/allUsers", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setUsers(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error(
          "Error fetching users: " +
            (err.response?.data?.message || "unknown error")
        );
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="w-full h-full overflow-y-scroll p-6">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="overflow-x-auto">
          <table
            className="w-full border-collapse shadow-lg rounded-lg overflow-hidden"
            style={{ tableLayout: "fixed" }}
          >
            <colgroup>
              {columnWidths.map((width, index) => (
                <col key={index} style={{ width: `${width}px` }} />
              ))}
            </colgroup>

            <thead>
              <tr className="bg-accent text-white">
                <th className="px-4 py-3 text-left">User ID</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-left">Joined</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-pink-50`}
                >
                  <td
                    className="px-4 py-3"
                    style={{ wordBreak: "break-word" }}
                  >
                    {user._id}
                  </td>

                  <td className="px-4 py-3">{user.firstName + " " + user.lastName}</td>

                  <td
                    className="px-4 py-3"
                    style={{ whiteSpace: "normal", wordBreak: "break-word" }}
                  >
                    {user.email}
                  </td>

                  <td className="px-4 py-3">
                    {user.phone ? user.phone : "-"}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        user.role === "admin"
                          ? "bg-purple-200 text-purple-800"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "-"}
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
