export function BrandCard({ brand, onClick }) {
  return (
    <div className="flex flex-col justify-center items-center cursor-pointer hover:text-pink-500" onClick={onClick}>
      <img
        className="w-24 h-24 border-0 rounded-full hover:scale-110 transition-transform duration-300"
        src={brand.images[0]}
        alt={brand.name}
      />
      <label className="mt-2 text-sm font-medium cursor-pointer">{brand.name}</label>
    </div>
  );
}
