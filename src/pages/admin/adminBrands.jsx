import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import brandImagesUpload from "../../utils/brandImagesUpload";
import axios from "axios";

export default function AdminBrands() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("active");
  const [image, setImage] = useState([]);
  const navigate = useNavigate();

  async function addBrand(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to add a product");
      return;
    }
    if (image.length <= 0) {
      toast.error("Please add at least one image");
      return;
    }
    const imgUrl = brandImagesUpload(image[0]);
    try {
      const imageUrl = await imgUrl;
      console.log(imageUrl);

      const brand = {
        name: name,
        images: [imageUrl],
        status: status,
      };
      axios
        .post(import.meta.env.VITE_BACKEND_URL + "/api/brands", brand, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          toast.success("Brand added successfully!");
          window.location.reload();
          navigate("/admin/brands");
        })
        .catch((e) => {
          toast.error(e.response?.data?.message || e.message || "Failed to add brand");
        });
    } catch (e) {
      console.log(e);
      const errorMessage =
        e.response?.data?.message || e.message || "Failed to add brand";
      toast.error(errorMessage);
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Brand Management</h1>
        <p className="text-gray-500">Add and manage beauty product brands</p>
      </div>

      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Add New Brand
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Brand Name
            </label>
            <input
              type="text"
              placeholder="Enter brand name"
              className="w-full rounded-lg border-gray-300 focus:border-pink-500 focus:ring-pink-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Status
            </label>
            <select
              className="w-full rounded-lg border-gray-300 focus:border-pink-500 focus:ring-pink-500"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Brand Logo
            </label>
            <input
              type="file"
              className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-lg file:border-0
            file:bg-pink-50 file:text-pink-600
            hover:file:bg-pink-100"
              onChange={(e) => setImage([...e.target.files])}
            />
          </div>

          <div className="md:col-span-2 text-right">
            <button
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg font-medium"
              onClick={addBrand}
            >
              Add Brand
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Brands List
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Logo</th>
                <th className="px-4 py-3">Brand Name</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr className="hover:bg-gray-100">
                <td className="px-4 py-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                </td>
                <td className="px-4 py-3 font-medium text-gray-700">L'Oréal</td>
                <td className="px-4 py-3">
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
                    Active
                  </span>
                </td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button className="text-red-600 hover:bg-red-500 border hover:text-white px-2 py-1.5 rounded-lg">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
