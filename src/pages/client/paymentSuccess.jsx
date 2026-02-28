import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const orderId = searchParams.get("order_id");
  const paymentId = searchParams.get("payment_id");

  useEffect(() => {
    if (orderId) {
      verifyPayment();
    }
  }, [orderId]);

  async function verifyPayment() {
    try {
      const backend = import.meta.env.VITE_BACKEND_URL;
      const token = localStorage.getItem("token");
      
      // Verify payment status from backend
      const res = await axios.get(
        `${backend}/api/payment/verify/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrderDetails(res.data);
      
      if (res.data.order?.status === "Paid") {
        toast.success("Payment verified successfully!");
      }
    } catch (err) {
      console.error("Verification error:", err);
      toast.error("Could not verify payment status");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-accent"></div>
          <p className="text-lg text-secondary">Verifying payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-center text-secondary mb-2">
          Payment Successful!
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Thank you for your purchase. Your order has been confirmed.
        </p>

        {/* Order Details */}
        {orderDetails && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Order ID:</span>
              <span className="font-semibold text-secondary">
                {orderDetails.order?.orderId || orderId}
              </span>
            </div>
            {paymentId && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Payment ID:</span>
                <span className="font-semibold text-secondary">{paymentId}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Amount:</span>
              <span className="font-semibold text-accent text-lg">
                Rs. {orderDetails.order?.total?.toFixed(2) || "0.00"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Status:</span>
              <span className="font-semibold text-green-600">
                {orderDetails.order?.status || "Paid"}
              </span>
            </div>
          </div>
        )}

        {/* Email Confirmation Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            📧 A confirmation email has been sent to your registered email address.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Link
            to="/products"
            className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:bg-secondary transition-all duration-300 text-center"
          >
            Continue Shopping
          </Link>
          <Link
            to="/"
            className="w-full bg-gray-200 text-secondary py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-300 text-center"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
