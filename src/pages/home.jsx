import Header from "../components/header";
import Footer from "../components/footer";
import ProductOverviewPage from "./client/productOverview";
import ProductPage from "./client/productPage";
import { Routes, Route } from "react-router-dom";
import CartPage from "./client/cart";
import CheckoutPage from "./client/checkOut";
import SearchProductPage from "./client/searchProduct";
import ClientHomePage from "./client/home";
import ProductsFromCategoriesPage from "./client/productsFromCategories";
import ProductsFromBrandsPage from "./client/productsFromBrands";
import AboutUsPage from "./client/aboutUs";
import ContactUsPage from "./client/contactUs";
import PaymentSuccessPage from "./client/paymentSuccess";
import PaymentCancelPage from "./client/paymentCancel";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <Header />
      <div className="w-full flex-1 flex flex-col items-center overflow-auto">
        <Routes path="/*">
          <Route path="/" element={<ClientHomePage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/products/category/:category" element={<ProductsFromCategoriesPage />} />
          <Route path="/products/brand/:brand" element={<ProductsFromBrandsPage />} />
          <Route path="/about" element={<h1>About</h1>} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/search" element={<SearchProductPage />} />
          <Route path="/overview/:id" element={<ProductOverviewPage/> }/>
          <Route path="/payment-success" element={<PaymentSuccessPage />} />
          <Route path="/payment-cancel" element={<PaymentCancelPage />} />
          <Route path="/*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}
