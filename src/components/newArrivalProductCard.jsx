import { addToCart } from "../utils/cart.jsx";
import { getCart } from "../utils/cart.jsx";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function NewArrivalProductCard({ product }) {
  if (product) {
    const hasImages = Array.isArray(product.images) && product.images.length > 0;
    return (
        <Link to={"/overview/" + product.productId} className="w-[20%] shadow shadow-fuchsia-500 h-[440px] rounded-xl">
          <div className="h-[300px] bg-gray-100 flex items-center justify-center">
            {hasImages ? (
              <img
                src={product.images[0]}
                className="w-[100%] h-[100%] rounded-t-xl object-cover"
                alt={product.name || "Product"}
              />
            ) : (
              <span className="text-gray-400">No Image</span>
            )}
          </div>
          <div className="h-[160px]">
            <div className="w-full flex justify-center items-center h-[70px]">
              <label className="text-center text-lg text-gray-500">
                {product.name}
              </label>
            </div>
            <div className="flex">
              <div className="w-[50%] flex-col justify-center items-center mt-2">
                <div className="w-[100%] justify-start items-center flex ps-5">
                  <label className="text-gray-500 line-through decoration-gray-400">
                    Rs.{product.labelPrice}.00
                  </label>
                </div>
                <div className="w-[100%] justify-start items-center flex ps-5 text-gray-600 font-bold">
                  <label>Rs.{product.price}.00</label>
                </div>
              </div>
              <div className="w-[50%] flex justify-center items-center mt-2">
                <button
                  className="w-[100px] h-[40px] bg-pink-500 rounded-xl text-white cursor-pointer hover:bg-pink-600"
                  onClick={() => {
                    console.log("Old cart");
                    console.log(getCart());
                    addToCart(product, 1);
                    console.log("New cart");
                    console.log(getCart());
                    toast.success("Added to cart");
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
      </Link>
    );
  }
}
