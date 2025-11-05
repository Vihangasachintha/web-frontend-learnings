import { useEffect, useState } from "react";
import { sampleProducts } from "../../assets/sampleData.js";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import toast from "react-hot-toast";

export default function AdminProductsPage() {
  const [products, setProducts] = useState(sampleProducts);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading == true) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
        .then((res) => {
          console.log(res.data);
          setProducts(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(
            "Failed to load products:",
            err?.response || err.message || err
          );
        });
    }
  }, [isLoading]);

  function deleteProduct(productId) {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to delete a product");
      return;
    }

    axios
      .delete(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        toast.success("Product deleted successfully!");
        setIsLoading(true);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }

  return (
    <div className="w-full h-full max-h-full overflow-y-scroll overflow-x-hidden bg-purple-800 relative">
      <Link
        to="/admin/add-product"
        className="absolute text-xl cursor-pointer bottom-5 right-5 bg-green-600 text-white rounded text-center flex justify-center items-center py-2 px-4"
      >
        +
      </Link>
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[70px] h-[70px] border-[5px] border-gray-500 border-t-blue-900 rounded-full animate-spin"></div>
        </div>
      ) : (
        <table className="w-full">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Name</th>
              <th>Image</th>
              <th>Labelled Price</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => {
              return (
                <tr key={item._id || item.productId || index}>
                  <td>{item.productId}</td>
                  <td>{item.name}</td>
                  <td>
                    <img
                      src={item.images[0]}
                      className="w-[50px] h-[50px] "
                      alt=""
                    />
                  </td>
                  <td>{item.labelPrice}</td>
                  <td>{item.price}</td>
                  <td>{item.stock}</td>
                  <td>
                    <div className="flex justify-center items-center w-full">
                      <FaTrash
                        onClick={() => deleteProduct(item.productId)}
                        className="text-[20px] text-red-500 mx-2 cursor-pointer"
                      />
                      <FaEdit
                        onClick={() => {
                          navigate("/admin/edit-product", {
                            state: item,
                          });
                        }}
                        className="text-[20px] text-blue-500 mx-2 cursor-pointer"
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
