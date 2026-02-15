export default function Brands({ brand }) {
  if (brand) {
    return (
      <div className="grid grid-cols-4 items-center hover:bg-gray-100 px-4 py-3 rounded-lg">
        {/* Logo */}
        <div>
          <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
            <img
              src={brand.images[0]}
              alt={brand.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Brand Name */}
        <div className="font-medium text-gray-700">{brand.name}</div>

        {/* Status */}
        <div>
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              brand.status === "active"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {brand.status}
          </span>
        </div>

        {/* Actions */}
        <div className="text-right space-x-2">
          <button className="text-red-600 hover:bg-red-500 border hover:text-white px-2 py-1.5 rounded-lg transition">
            Deactive
          </button>
        </div>
      </div>
    );
  }
}
