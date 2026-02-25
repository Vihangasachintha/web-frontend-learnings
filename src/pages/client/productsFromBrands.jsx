import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import ProductCard from "../../components/productCard";
import Loading from "../../components/loading";

export default function ProductsFromBrandsPage() {
  const { brand } = useParams();
  const location = useLocation();
  const brandName = location.state?.brandName || brand;
  const brandId = location.state?.brandId || brand;
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (brandId) {
      setIsLoading(true);
      axios
        .get(import.meta.env.VITE_BACKEND_URL + `/api/products/brand/${brandId}`)
        .then((res) => {
          const list = Array.isArray(res.data)
            ? res.data
            : Array.isArray(res.data?.products)
              ? res.data.products
              : [];
          setProducts(list);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
          setProducts([]);
          setIsLoading(false);
        });
    }
  }, [brandId]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h1 className="w-full text-center text-2xl font-semibold py-6">
        {brandName} Products
      </h1>
      
      <div className="w-full flex flex-wrap justify-center items-center">
        {products.length === 0 ? (
          <div className="text-gray-500 py-8">No products found.</div>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product._id || product.productId}
              product={product}
            />
          ))
        )}
      </div>

      <div className="w-full py-2"></div>
    </div>
  );
}
