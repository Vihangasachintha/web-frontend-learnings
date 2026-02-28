import { useSearchParams, Link, useNavigate } from "react-router-dom";

export default function PaymentCancelPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const orderId = searchParams.get("order_id");

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        {/* Cancel Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>

        {/* Cancel Message */}
        <h1 className="text-3xl font-bold text-center text-secondary mb-2">
          Payment Cancelled
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Your payment was cancelled. No charges were made to your account.
        </p>

        {/* Order Info */}
        {orderId && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Order ID:</span>
              <span className="font-semibold text-secondary">{orderId}</span>
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-yellow-800">
            💡 Your order is still in pending status. You can complete the payment later or try again now.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:bg-secondary transition-all duration-300"
          >
            Try Again
          </button>
          <Link
            to="/cart"
            className="w-full bg-gray-200 text-secondary py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-300 text-center"
          >
            Return to Cart
          </Link>
          <Link
            to="/"
            className="w-full text-gray-600 py-2 text-center hover:text-secondary transition-all duration-300"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
