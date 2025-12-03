import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../components/productCard";
import Loading from "../../components/loading";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
        .then((res) => {
          const list = Array.isArray(res.data)
            ? res.data
            : Array.isArray(res.data?.products)
            ? res.data.products
            : [];
          setProducts(list);
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full h-full flex flex-wrap justify-center items-center">
      {products.length === 0 ? (
        <div className="text-gray-500 py-8">No products found.</div>
      ) : (
        products.map((product) => (
          <ProductCard key={product._id || product.productId} product={product} />
        ))
      )}
    </div>
  );
}
