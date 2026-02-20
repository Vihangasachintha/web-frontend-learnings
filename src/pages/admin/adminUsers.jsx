import axios from "axios";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import Loading from "../../components/loading";
import toast from "react-hot-toast";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const columnWidths = [240, 140, 180, 260, 120, 160];

  Modal.setAppElement("#root");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  function openStatusModal(user) {
    setSelectedUser(user);
    setIsModalOpen(true);
  }

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
            (err.response?.data?.message || "unknown error"),
        );
        setIsLoading(false);
      });
  }, []);

  // Function to update user status (block/unblock)
  const updateUserStatus = async () => {
    if (!selectedUser) return;

    setIsUpdating(true);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${selectedUser._id}/status`,
        {
          isBlocked: !selectedUser.isBlocked, // Toggle the status
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      // Update the users list with the new status
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === selectedUser._id
            ? { ...user, isBlocked: !user.isBlocked }
            : user
        )
      );

      toast.success(
        response.data.message ||
          `User ${!selectedUser.isBlocked ? "blocked" : "activated"} successfully`
      );
      
      setIsModalOpen(false);
      setSelectedUser(null);
    } catch (err) {
      toast.error(
        "Error updating user status: " +
          (err.response?.data?.message || "unknown error")
      );
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="w-full h-full overflow-y-scroll p-6">
      {/* Modal for changing user status */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 50,
          },
          content: {
            position: "static",
            inset: "unset",
            border: "none",
            borderRadius: "16px",
            padding: "0",
            maxWidth: "420px",
            width: "100%",
          },
        }}
      >
        {selectedUser && (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4 text-center">
              Change User Status
            </h2>

            <div className="space-y-2 mb-6 text-sm">
              <p>
                <strong>Name:</strong> {selectedUser.firstName} {selectedUser.lastName}
              </p>
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p>
                <strong>Current Status:</strong>{" "}
                <span className="font-semibold">
                  {selectedUser.isBlocked ? "Blocked" : "Active"}
                </span>
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>

              <button
                onClick={updateUserStatus}
                disabled={isUpdating}
                className={`flex-1 py-2 rounded-lg text-white font-semibold ${
                  selectedUser.isBlocked
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-500 hover:bg-red-600"
                } ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isUpdating
                  ? "Updating..."
                  : selectedUser.isBlocked
                    ? "Activate User"
                    : "Block User"}
              </button>
            </div>
          </div>
        )}
      </Modal>

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
                <th className="px-4 py-3 text-left">Fisrt Name</th>
                <th className="px-4 py-3 text-left">Last Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-left">Status</th>
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
                  <td className="px-4 py-3" style={{ wordBreak: "break-word" }}>
                    {user._id}
                  </td>

                  <td className="px-4 py-3">{user.firstName}</td>

                  <td className="px-4 py-3">{user.lastName}</td>

                  <td
                    className="px-4 py-3"
                    style={{ whiteSpace: "normal", wordBreak: "break-word" }}
                  >
                    {user.email}
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

                  <td
                    onClick={() => openStatusModal(user)}
                    className="px-4 py-3 cursor-pointer"
                  >
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        user.isBlocked
                          ? "bg-red-200 text-red-600"
                          : "bg-green-200 text-green-600"
                      }`}
                    >
                      {user.isBlocked ? "Blocked" : "Active"}
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
