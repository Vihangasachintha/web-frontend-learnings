import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link to={"/overview/"+product.productId} className="w-[300px] bg-white shadow-lg rounded-xl m-2 overflow-hidden border hover:scale-[1.02] transition-all cursor-pointer">
      {/* image */}
      <div className="w-full h-[180px] bg-gray-200 flex items-center justify-center overflow-hidden">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-500 text-sm">No Image</span>
        )}
      </div>

      {/* content */}
      <div className="p-4 flex flex-col h-[180px]">
        <h2 className="text-lg font-semibold line-clamp-1">{product.name}</h2>

        {product.altNames && product.altNames.length > 0 && (
          <p className="text-xs text-gray-500 mt-[2px] line-clamp-1">
            ({product.altNames.join(", ")})
          </p>
        )}

        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {product.description}
        </p>

        <div className="flex justify-between items-end mt-auto pt-3">
          <div>
            <p className="text-sm text-gray-400 line-through">
              Rs {product.labelPrice}
            </p>
            <p className="text-xl font-bold text-green-600">
              Rs {product.price}
            </p>
          </div>

          {product.isAvailable ? (
            <span className="text-sm text-green-500 font-medium">
              In Stock
            </span>
          ) : (
            <span className="text-sm text-red-500 font-medium">
              Out of Stock
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
