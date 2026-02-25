import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useLocation } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";
import axios from "axios";

export default function EditProductPage() {
  const location = useLocation();
  const [productId, setProductId] = useState(location.state.productId);
  const [name, setName] = useState(location.state.name);
  const [altNames, setAltNames] = useState(location.state.altNames.join(","));
  const [description, setDescription] = useState(location.state.description);
  const [images, setImages] = useState([]);
  const [labelPrice, setLabelledPrice] = useState(location.state.labelPrice);
  const [price, setPrice] = useState(location.state.price);
  const [stock, setStock] = useState(location.state.stock);
  const [category, setCategory] = useState(location.state.category);
  const [brand, setBrand] = useState(location.state.brand);
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();
  

  console.log(location);

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

  async function UpdateProduct(e) {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to update a product");
      return;
    }

    let imageUrls = location.state.images;

    const promisesArray = [];

    for (let i = 0; i < images.length; i++) {
      promisesArray[i] = mediaUpload(images[i]);
    }

    try {
        if(images.length > 0){
            imageUrls = await Promise.all(promisesArray);
            console.log("Uploaded new image URLs:", imageUrls);
            
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
        }
        
      console.log("Image URLs:", imageUrls);

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
        .put(import.meta.env.VITE_BACKEND_URL + "/api/products/"+productId, product, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          console.log("Product updated successfully:", res.data);
          toast.success("Product updated successfully!");
          navigate("/admin/products");
        })
        .catch((e) => {
          console.error("Error updating product:", e);
          toast.error(e.response?.data?.message || "Failed to update product. Please try again.");
        });
    } catch (e) {
      console.error("Error during product update:", e);
      toast.error("Failed to upload images. Please try again.");
    }
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-green-800">
      <h1 className="text-3xl font-bold mb-4">Edit Product</h1>
      <input
        type="text"
        disabled
        placeholder="Product ID"
        className="input input-bordered w-full max-w-xs"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Name"
        className="input input-bordered w-full max-w-xs"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Alt Names"
        className="input input-bordered w-full max-w-xs"
        value={altNames}
        onChange={(e) => setAltNames(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        className="input input-bordered w-full max-w-xs"
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
        className="input input-bordered w-full max-w-xs"
        onChange={(e) => setImages([...e.target.files])}
      />
      <input
        type="number"
        placeholder="Labelled Price"
        className="input input-bordered w-full max-w-xs"
        value={labelPrice}
        onChange={(e) => setLabelledPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        className="input input-bordered w-full max-w-xs"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Stock"
        className="input input-bordered w-full max-w-xs"
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
          onClick={UpdateProduct}
        >
          Update Product
        </button>
      </div>
    </div>
  );
}
