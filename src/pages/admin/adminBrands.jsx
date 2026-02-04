import { useState } from "react";
import toast from "react-hot-toast";

export default function AdminBrands() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("active");
  const [logo, setLogo] = useState([]);

  async function addBrand(e) {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to add a product");
      return;
    }
    if (images.length <= 0) {
      toast.error("Please add at least one image");
      return;
    }
    
  }

  return (
    <div class="max-w-7xl mx-auto p-6">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Brand Management</h1>
        <p class="text-gray-500">Add and manage beauty product brands</p>
      </div>

      <div class="bg-white rounded-xl shadow p-6 mb-8">
        <h2 class="text-lg font-semibold text-gray-700 mb-4">Add New Brand</h2>

        <form class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">
              Brand Name
            </label>
            <input
              type="text"
              placeholder="Enter brand name"
              class="w-full rounded-lg border-gray-300 focus:border-pink-500 focus:ring-pink-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">
              Status
            </label>
            <select class="w-full rounded-lg border-gray-300 focus:border-pink-500 focus:ring-pink-500">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-600 mb-1">
              Brand Logo
            </label>
            <input
              type="file"
              class="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-lg file:border-0
            file:bg-pink-50 file:text-pink-600
            hover:file:bg-pink-100"
            />
          </div>

          <div class="md:col-span-2 text-right">
            <button
              type="submit"
              class="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg font-medium"
            >
              Add Brand
            </button>
          </div>
        </form>
      </div>

      <div class="bg-white rounded-xl shadow p-6">
        <h2 class="text-lg font-semibold text-gray-700 mb-4">Brands List</h2>

        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left">
            <thead class="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th class="px-4 py-3">Logo</th>
                <th class="px-4 py-3">Brand Name</th>
                <th class="px-4 py-3">Status</th>
                <th class="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y">
              <tr class="hover:bg-gray-100">
                <td class="px-4 py-3">
                  <div class="w-10 h-10 bg-gray-200 rounded-full"></div>
                </td>
                <td class="px-4 py-3 font-medium text-gray-700">L'Oréal</td>
                <td class="px-4 py-3">
                  <span class="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
                    Active
                  </span>
                </td>
                <td class="px-4 py-3 text-right space-x-2">
                  <button class="text-blue-600 hover:underline">Edit</button>
                  <button class="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
