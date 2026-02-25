import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";
import axios from "axios";

export default function AddProduct() {
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [altNames, setAltNames] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [labelPrice, setLabelledPrice] = useState(0);
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/api/brands",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setBrands(response.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
        toast.error("Failed to load brands");
      }
    };

    fetchBrands();
  }, []);

  async function AddProduct(e) {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to add a product");
      return;
    }

    if (images.length <= 0) {
      toast.error("Please add at least one image");
      return;
    }
    const promisesArray = [];

    for (let i = 0; i < images.length; i++) {
      promisesArray[i] = mediaUpload(images[i]);
    }

    try {
      const imageUrls = await Promise.all(promisesArray);
      console.log("Uploaded image URLs:", imageUrls);

      // Validate that all images were uploaded successfully
      if (!imageUrls || imageUrls.length === 0) {
        toast.error("Failed to upload images. Please try again.");
        return;
      }

      // Check if any URL is invalid
      const invalidUrls = imageUrls.filter(url => !url || typeof url !== 'string' || url.trim() === '');
      if (invalidUrls.length > 0) {
        toast.error("Some images failed to upload. Please try again.");
        console.error("Invalid URLs:", invalidUrls);
        return;
      }

      // Handle empty altNames properly
      const altNamesArray = altNames.trim() ? altNames.split(",").map(name => name.trim()).filter(name => name) : [];

      const product = {
        productId: productId,
        name: name,
        altNames: altNamesArray,
        description: description,
        images: imageUrls,
        labelPrice: labelPrice,
        price: price,
        stock: stock,
        category: category,
        brand: brand
      };
      
      console.log("Product data being sent:", product);
      
      await axios
        .post(import.meta.env.VITE_BACKEND_URL + "/api/products", product, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          console.log("Product created successfully:", res.data);
          toast.success("Product added successfully!");
          navigate("/admin/products");
        })
        .catch((e) => {
          console.error("Error creating product:", e);
          toast.error(e.response?.data?.message || "Failed to add product. Please try again.");
        });
    } catch (e) {
      console.error("Error during product creation:", e);
      toast.error("Failed to upload images. Please try again.");
    }
  }

  return (
    
    <div className="w-full h-full flex flex-col justify-center items-center bg-white rounded-lg shadow-md p-6 gap-3">
      <input
        type="text"
        placeholder="Product ID"
        className="input input-bordered w-full max-w-xs border rounded border-blue-600 h-10"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Name"
        className="input input-bordered w-full max-w-xs border rounded border-blue-600 h-10"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Alt Names"
        className="input input-bordered w-full max-w-xs border rounded border-blue-600 h-10"
        value={altNames}
        onChange={(e) => setAltNames(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        className="input input-bordered w-full max-w-xs border rounded border-blue-600 h-10"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        className="select select-bordered w-full max-w-xs border rounded border-blue-600 h-10"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="" disabled>
          Select Category
        </option>
        <option value="Skincare">Skincare</option>
        <option value="Makeup">Makeup</option>
        <option value="Hair">Hair</option>
        <option value="Bath & Body">Bath & Body</option>
        <option value="Fragrance">Fragrance</option>
        <option value="Wellness">Wellness</option>
        <option value="Tools & Accessories">Tools & Accessories</option>
      </select>
      <select
        className="select select-bordered w-full max-w-xs border rounded border-blue-600 h-10"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
      >
        <option value="" disabled>
          Select Brand
        </option>
        {brands.map((brand) => (
          <option key={brand._id} value={brand._id}>
            {brand.name}
          </option>
        ))}
      </select>
      <input
        type="file"
        multiple
        placeholder="Images"
        className="input input-bordered w-full max-w-xs border rounded border-blue-600"
        onChange={(e) => setImages([...e.target.files])}
      />
      <input
        type="number"
        placeholder="Labelled Price"
        className="input input-bordered w-full max-w-xs border rounded border-blue-600 h-10"
        value={labelPrice}
        onChange={(e) => setLabelledPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        className="input input-bordered w-full max-w-xs border rounded border-blue-600 h-10"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Stock"
        className="input input-bordered w-full max-w-xs border rounded border-blue-600 h-10"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />
      <div className="w-full flex justify-center items-center mt-4">
        <Link
          to="/admin/products"
          className="bg-red-500 text-white font-bold py-2 px-4 rounded mr-4 flex flex-row"
        >
          Cancel
        </Link>
        <button
          className="bg-green-500 text-white font-bold py-2 px-4 rounded mr-4"
          onClick={AddProduct}
        >
          Add Product
        </button>
      </div>
    </div>
  );
}
