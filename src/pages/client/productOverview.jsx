import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"

export default function ProductOverviewPage(){
    const params = useParams()
    const productId = params.id
    const [status, setStatus] = useState("loading")
    const  [product, setProduct] = useState(null)

    useEffect(() => {
        if (!productId) return;
        axios
            .get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId)
            .then((response) => {
                console.log(response.data)
                setProduct(response.data)
                setStatus("success")
            })
            .catch((error) => {
                console.log(error)
                setStatus("error")
                toast.error("Error fetching product details")
            })
    }, [productId])

    return(
        <div className="bg-primary">
            This is overview page for product {JSON.stringify(product)}
        </div>
    )
}