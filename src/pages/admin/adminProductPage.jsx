import { useEffect, useState } from "react";
import { sampleProducts } from "../../assets/sampleData.js";
import axios from "axios";
import { Link } from "react-router-dom";


export default function AdminProductPage() {
  const [products, setProducts] = useState(sampleProducts);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Failed to load products:", err?.response || err.message || err);
      });
  }, []);

  return (
    <div className="w-full h-full max-h-full overflow-y-scroll overflow-x-hidden bg-purple-800 relative">
      <Link to="/admin/add-product" className="absolute text-xl cursor-pointer bottom-5 right-5 bg-green-600 text-white rounded text-center flex justify-center items-center py-2 px-4">+</Link>
      <table className="w-full">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Labelled Price</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => {
            return (
              <tr key={index}>
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
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
