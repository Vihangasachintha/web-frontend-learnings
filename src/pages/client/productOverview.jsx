import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import ImageSlider from "../../components/imageSlider.jsx";
import Loading from "../../components/loading.jsx";
import "./style.css"

export default function ProductOverviewPage() {
  const params = useParams();
  const productId = params.id;
  const [status, setStatus] = useState("loading");
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!productId) return;
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId)
      .then((response) => {
        console.log(response.data);
        setProduct(response.data);
        setStatus("success");
      })
      .catch((error) => {
        console.log(error);
        setStatus("error");
        toast.error("Error fetching product details");
      });
  }, [productId]);

  return (
    <>
      {status === "success" && (
        <div className="w-full h-full flex">
          <div className="w-[50%] h-full flex justify-center items-center">
            <ImageSlider images={product.images} />
          </div>
          <div className="w-[50%] bg-blue-900 h-full">
            <button className="active:bg-red-900 hover:bg-accent">Add to Cart</button>
          </div>
        </div>
      )}
      {
        status === "loading" && <Loading />
      }
    </>
  );
}
