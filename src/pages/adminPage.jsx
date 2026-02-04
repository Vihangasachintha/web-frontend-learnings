import { Link, Routes, Route, useLocation } from "react-router-dom";

import Loading from "../components/loading";
import AddProduct from "./admin/addProductPage";
import AdminProductsPage from "./admin/productPage.jsx";
import EditProductPage from "./admin/editProductPage.jsx";
import AdminOrdersPage from "./admin/adminOrdersPage.jsx";
import AdminBrands from "./admin/adminBrands.jsx";
import { use, useEffect,useState } from "react";
import axios from "axios";


export default function AdminPage() {
  const location = useLocation();
  const path = location.pathname;
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setStatus("unauthenticated");
      window.location.href = "/login";
    } else {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/users/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data.role !== "admin") {
            setStatus("unauthenticated");
            window.location.href = "/";
          } else {
            setStatus("authenticated");
          }
        })
        .catch((error) => {
          console.error(error);
          setStatus("unauthenticated");
          window.location.href = "/login";
        });
    }
  }, [status]);

  function getClass(name) {
    if (path.includes(name)) {
      return "bg-accent text-white p-4";
    } else {
      return "text-accent p-4";
    }
  }

  return (
    <div className="w-full h-screen flex bg-accent">
      {status === "loading" || status === "unauthenticated" ? 
      <Loading /> :
        <>
          <div className="h-full w-[300px] text-accent font-bold text-xl flex flex-col bg-white">
            <Link className={getClass("products")} to="/admin/products">
              Products
            </Link>
            <Link className={getClass("users")} to="/admin/users">
              Users
            </Link>
            <Link className={getClass("orders")} to="/admin/orders">
              Orders
            </Link>
            <Link className={getClass("reviews")} to="/admin/reviews">
              Reviews
            </Link>
            <Link className={getClass("brands")} to="/admin/brands">
              Brands
            </Link>
          </div>
          <div className="h-full w-[calc(100%-300px)] border-accent border-4 rounded-xl bg-white">
            <Routes path="/*">
              <Route path="/products" element={<AdminProductsPage />}>
                Products
              </Route>
              <Route path="/users" element={<h1>Users</h1>}>
                Users
              </Route>
              <Route path="/orders" element={<AdminOrdersPage />}></Route>
              <Route path="/reviews" element={<h1>Reviews</h1>}>
                Reviews
              </Route>
              <Route path="/brands" element={<AdminBrands />}>
                Brands
              </Route>
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/edit-product" element={<EditProductPage />} />
            </Routes>
          </div>
        </>
      }
    </div>
  );
}
