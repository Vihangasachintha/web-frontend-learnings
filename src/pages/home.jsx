import Header from "../components/header";
import Footer from "../components/footer";
import ProductOverviewPage from "./client/productOverview";
import ProductPage from "./client/productPage";
import { Routes, Route } from "react-router-dom";
import CartPage from "./client/cart";
import CheckoutPage from "./client/checkOut";
import SearchProductPage from "./client/searchProduct";
import ClientHomePage from "./client/home";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <Header />
      <div className="w-full flex-1 flex flex-col items-center overflow-auto">
        <Routes path="/*">
          <Route path="/" element={<ClientHomePage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/about" element={<h1>About</h1>} />
          <Route path="/contact" element={<h1>Contact</h1>} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/search" element={<SearchProductPage />} />
          <Route path="/overview/:id" element={<ProductOverviewPage/> }/>
          <Route path="/*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}
