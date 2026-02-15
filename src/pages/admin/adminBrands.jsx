import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import brandImagesUpload from "../../utils/brandImagesUpload";
import axios from "axios";
import Brands from "../../components/brands";
import Loading from "../../components/loading";

export default function AdminBrands() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("active");
  const [image, setImage] = useState([]);
  const navigate = useNavigate();

  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
          setTimeout(() => {
            window.location.reload();
            navigate("/admin/brands");
          }, 1500);
        })
        .catch((e) => {
          toast.error(
            e.response?.data?.message || e.message || "Failed to add brand",
          );
        });
    } catch (e) {
      console.log(e);
      const errorMessage =
        e.response?.data?.message || e.message || "Failed to add brand";
      toast.error(errorMessage);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/brands")
      .then((res) => {
        setBrands(res.data);
        setIsLoading(false);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching brands:", error);
        setBrands([]);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="w-full h-full overflow-y-scroll mx-auto p-6 ">
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

        {isLoading ? (
          <Loading />
        ) : brands.length > 0 ? (
          <div className="space-y-2">
            {/* Header Row */}
            <div className="grid grid-cols-4 bg-gray-50 text-gray-600 uppercase text-xs font-semibold px-4 py-3 rounded-lg">
              <div>Logo</div>
              <div>Brand Name</div>
              <div>Status</div>
              <div className="text-right">Actions</div>
            </div>

            {/* Brand Rows */}
            {brands.map((brand) => (
              <Brands key={brand._id} brand={brand} />
            ))}
          </div>
        ) : (
          <div className="text-gray-500 text-sm">No brands available!</div>
        )}
      </div>
    </div>
  );
}
