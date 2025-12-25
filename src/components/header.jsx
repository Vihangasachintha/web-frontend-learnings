import UserData from "./userData.jsx";
import { Link, useNavigate } from "react-router-dom";
import { BsCart3, BsSearch, BsPerson } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseOutline } from "react-icons/io5";
import { useState } from "react";

export default function Header() {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  
  return (
    <header className="w-full bg-white sticky top-0 z-50 border-b border-gray-100">
      {/* Top Bar - Optional: For announcements */}
      <div className="w-full bg-black text-white text-center py-2 text-xs tracking-wider">
        <p>FREE SHIPPING ON ORDERS OVER $100</p>
      </div>

      {/* Main Header */}
      <div className="max-w-[1400px] mx-auto px-6 h-[50px] flex items-center justify-between">
        
        {/* Left Navigation - Primary Categories */}
        <nav className="hidden lg:flex items-center gap-8 flex-1">
          <Link 
            to="/" 
            className="text-[13px] font-medium tracking-wider uppercase text-black hover:text-gray-600 transition-colors"
          >
            Home
          </Link>
          <Link 
            to="/products" 
            className="text-[13px] font-medium tracking-wider uppercase text-black hover:text-gray-600 transition-colors"
          >
            Shop
          </Link>
          <Link 
            to="/about" 
            className="text-[13px] font-medium tracking-wider uppercase text-black hover:text-gray-600 transition-colors"
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className="text-[13px] font-medium tracking-wider uppercase text-black hover:text-gray-600 transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Icon */}
        <button 
          className="lg:hidden text-2xl text-black"
          onClick={() => setSideDrawerOpen(true)}
          aria-label="Open menu"
        >
          <GiHamburgerMenu />
        </button>

        {/* Center Logo */}
        <div className="flex items-center justify-center lg:mx-12">
          <img
            onClick={() => navigate("/")}
            src="/logo.png"
            alt="Logo"
            className="h-[50px] w-auto object-contain cursor-pointer"
          />
        </div>

        {/* Right Navigation - Utility Links */}
        <div className="hidden lg:flex items-center gap-6 flex-1 justify-end">
          <Link 
            to="/search" 
            className="text-xl text-black hover:text-gray-600 transition-colors"
            aria-label="Search"
          >
            <BsSearch />
          </Link>
          
          {token == null ? (
            <Link 
              to="/login" 
              className="text-xl text-black hover:text-gray-600 transition-colors"
              aria-label="Login"
            >
              <BsPerson />
            </Link>
          ) : (
            <button 
              className="text-[13px] font-medium tracking-wider uppercase text-black hover:text-gray-600 transition-colors"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/";
              }}
            >
              Logout
            </button>
          )}
          
          <Link 
            to="/cart" 
            className="text-xl text-black hover:text-gray-600 transition-colors relative"
            aria-label="Cart"
          >
            <BsCart3 />
          </Link>
        </div>

        {/* Mobile Right Icons */}
        <div className="flex lg:hidden items-center gap-4">
          <Link to="/search" className="text-xl text-black">
            <BsSearch />
          </Link>
          <Link to="/cart" className="text-xl text-black">
            <BsCart3 />
          </Link>
        </div>
      </div>

      {/* Mobile Side Drawer */}
      {sideDrawerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 lg:hidden">
          <div className="w-[320px] h-full bg-white shadow-2xl animate-slide-in">
            {/* Drawer Header */}
            <div className="h-[90px] border-b border-gray-100 flex items-center justify-between px-6">
              <img
                onClick={() => {
                  setSideDrawerOpen(false);
                  navigate("/");
                }}
                src="/logo.png"
                alt="Logo"
                className="h-[40px] w-auto object-contain cursor-pointer"
              />
              <button
                onClick={() => setSideDrawerOpen(false)}
                className="text-3xl text-black"
                aria-label="Close menu"
              >
                <IoCloseOutline />
              </button>
            </div>

            {/* Drawer Content */}
            <nav className="flex flex-col p-6 gap-1">
              <Link 
                to="/" 
                className="text-[14px] font-medium tracking-wider uppercase text-black py-4 border-b border-gray-100"
                onClick={() => setSideDrawerOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="text-[14px] font-medium tracking-wider uppercase text-black py-4 border-b border-gray-100"
                onClick={() => setSideDrawerOpen(false)}
              >
                Shop
              </Link>
              <Link 
                to="/about" 
                className="text-[14px] font-medium tracking-wider uppercase text-black py-4 border-b border-gray-100"
                onClick={() => setSideDrawerOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="text-[14px] font-medium tracking-wider uppercase text-black py-4 border-b border-gray-100"
                onClick={() => setSideDrawerOpen(false)}
              >
                Contact
              </Link>
              
              {token == null ? (
                <Link 
                  to="/login" 
                  className="text-[14px] font-medium tracking-wider uppercase text-black py-4 border-b border-gray-100"
                  onClick={() => setSideDrawerOpen(false)}
                >
                  Login
                </Link>
              ) : (
                <button
                  className="text-[14px] font-medium tracking-wider uppercase text-black py-4 border-b border-gray-100 text-left"
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    window.location.href = "/";
                  }}
                >
                  Logout
                </button>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
