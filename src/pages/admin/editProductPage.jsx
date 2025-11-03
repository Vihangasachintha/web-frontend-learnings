import { useState } from "react";
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
  const navigate = useNavigate();

  console.log(location);

  async function UpdateProduct(e) {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to add a product");
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
        }
      console.log(imageUrls);

      const altNamesArray = altNames.split(",");

      const product = {
        productId: productId,
        name: name,
        altNames: altNamesArray,
        description: description,
        images: imageUrls,
        labelPrice: labelPrice,
        price: price,
        stock: stock,
      };
      axios
        .put(import.meta.env.VITE_BACKEND_URL + "/api/products/"+productId, product, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          toast.success("Product updated successfully!");
          navigate("/admin/products");
        })
        .catch((e) => {
          toast.error(e.response.data.message);
        });
    } catch (e) {
      console.log(e);
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
