import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";
import { useLocation } from "react-router-dom";

export default function CheckoutPage() {
  const location = useLocation();
  const [cart, setCart] = useState(location.state?.cart || []);
  const [email, setEmail] = useState(localStorage.getItem("userEmail") || "");
  const [name, setName] = useState(localStorage.getItem("userName") || "");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  function getTotals() {
    let total = 0;
    let labelledTotal = 0;
    cart.forEach((item) => {
      const qty = Number(item.qty ?? 1);
      const price = Number(item.price ?? 0);
      const labelPrice = Number(item.labelPrice ?? item.labelledPrice ?? item.price ?? 0);
      total += price * qty;
      labelledTotal += labelPrice * qty;
    });
    return { total, labelledTotal };
  }

  function removeFromCart(index) {
    setCart((prev) => prev.filter((_, i) => i !== index));
  }

  function changeQty(index, qtyDiff) {
    const newQty = Number(cart[index].qty ?? 1) + qtyDiff;
    if (newQty <= 0) {
      removeFromCart(index);
      return;
    }
    const newCart = [...cart];
    newCart[index] = { ...newCart[index], qty: newQty };
    setCart(newCart);
  }

  // Build products payload matching backend schema
  function buildProductsPayload() {
  return cart
    .map((item) => {
      const productId =
        item.productId ||
        item.id ||
        item._id ||
        null;

      if (!productId) {
        console.error("Missing productId in cart item:", item);
        return null;
      }

      return {
        productId: String(productId),   // Backend expects this
        quantity: Number(item.qty ?? 1)
      };
    })
    .filter(Boolean);
}

  // Validate products exist in database before placing order
  async function validateProducts() {
    const token = localStorage.getItem("token");
    const backend = import.meta.env.VITE_BACKEND_URL;
    
    const invalidProducts = [];
    
    for (let i = 0; i < cart.length; i++) {
      const item = cart[i];
      const productId = item.productId || item.id || item._id;
      
      try {
        await axios.get(`${backend}/api/products/${productId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (err) {
        if (err.response?.status === 404) {
          invalidProducts.push({ index: i, item, productId });
        }
      }
    }
    
    return invalidProducts;
  }

async function placeOrder() {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("Please login to place order");
    return;
  }

  if (!email || !name || !phoneNumber || !address) {
    toast.error("Please fill email, name, phone, and address");
    return;
  }

  if (!cart.length) {
    toast.error("Cart is empty");
    return;
  }

  // Validate products exist in database
  toast.loading("Validating cart items...");
  const invalidProducts = await validateProducts();
  toast.dismiss();
  
  if (invalidProducts.length > 0) {
    const productNames = invalidProducts.map(p => p.item.name).join(", ");
    const productIds = invalidProducts.map(p => p.productId).join(", ");
    
    console.error("Invalid products found in cart:", invalidProducts);
    
    toast.error(
      `${invalidProducts.length} product(s) no longer available: ${productNames}`,
      { duration: 5000 }
    );
    
    // Remove invalid products from cart
    const validCart = cart.filter((_, index) => 
      !invalidProducts.some(p => p.index === index)
    );
    setCart(validCart);
    
    console.log(`Removed invalid products (IDs: ${productIds}). Please review your cart.`);
    return;
  }

  const { total, labelledTotal } = getTotals();
  const products = buildProductsPayload();

  if (!products.length) {
    toast.error("Invalid cart items. Try re-adding products.");
    return;
  }

  const orderInformation = {
    email,
    name,
    phone: phoneNumber,
    address,
    labelledTotal,
    total,
    products   // ← Now correct format
  };

  try {
    const backend = import.meta.env.VITE_BACKEND_URL;
    
    // Step 1: Create order
    const orderRes = await axios.post(`${backend}/api/orders`, orderInformation, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      withCredentials: false,
    });

    // Extract orderId from response (could be at data.orderId or data.order.orderId)
    const orderId = orderRes.data.orderId || orderRes.data.order?.orderId;
    toast.success("Order created! Redirecting to payment...");
    console.log("Order created:", orderRes.data);
    console.log("Extracted orderId:", orderId);

    // Step 2: Get payment hash from backend
    const paymentData = {
      orderId: orderId,
      amount: total.toFixed(2),
      currency: "LKR",
      first_name: name.split(" ")[0] || name,
      last_name: name.split(" ").slice(1).join(" ") || "",
      email: email,
      phone: phoneNumber,
      address: address,
      city: "Colombo", // You can add a city field or default it
      country: "Sri Lanka"
    };
    
    console.log("Payment data being sent:", JSON.stringify(paymentData, null, 2));

    // Step 2b: Get payment hash from backend (send all payment data)
    const paymentResponse = await axios.post(
      `${backend}/api/payment/create-payment`,
      paymentData, // Send complete payment data
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Payment hash received:", paymentResponse.data);

    // Step 3: Redirect to PayHere
    initiatePayHerePayment(paymentResponse.data, paymentData);
    
    setCart([]); // Clear cart after initiating payment
  } catch (err) {
    const data = err.response?.data;
    
    // Log the full error response to debug
    console.error("Full error response:", JSON.stringify(err.response?.data, null, 2));
    console.error("Status:", err.response?.status);
    console.error("Cart items sent:", JSON.stringify(products, null, 2));
    
    const serverMessage =
      (typeof data === "string" ? data : data?.message) ||
      (Array.isArray(data?.errors) ? data.errors.join(", ") : null) ||
      (data?.error?.message ?? null);

    // Handle specific error cases
    if (err.response?.status === 404) {
      // Check if it's a product not found error
      if (serverMessage && serverMessage.includes("Product") && serverMessage.includes("not found")) {
        // Extract product ID from error message using regex
        const productIdMatch = serverMessage.match(/productId ([a-f0-9]+)/);
        const missingProductId = productIdMatch ? productIdMatch[1] : "unknown";
        
        // Find the product in cart
        const missingProduct = cart.find(item => 
          String(item.productId || item.id || item._id) === missingProductId
        );
        
        const productName = missingProduct?.name || "Unknown Product";
        
        toast.error(
          `Product "${productName}" (ID: ${missingProductId}) no longer exists. Removing from cart...`,
          { duration: 5000 }
        );
        
        // Remove the invalid product from cart
        const updatedCart = cart.filter(item => 
          String(item.productId || item.id || item._id) !== missingProductId
        );
        setCart(updatedCart);
        
        console.error(`Removed invalid product: ${productName} (${missingProductId})`);
      } else {
        toast.error("Endpoint not found. Check backend routes.");
      }
    } else if (err.response?.status === 400) {
      toast.error(serverMessage || "Invalid order data. Check console for details.");
    } else {
      toast.error(serverMessage || "Failed to create order");
    }
    
    console.error("Order error:", err.message);
  }
}

function initiatePayHerePayment(hashData, paymentData) {
  const backend = import.meta.env.VITE_BACKEND_URL;
  const frontendUrl = window.location.origin;
  
  // 🔍 DEBUG: Log all values being sent to PayHere
  console.log("=== PAYHERE FORM DATA ===");
  console.log("Hash Data from Backend:", hashData);
  console.log("Payment Data (local):", paymentData);
  console.log("========================");
  
  // Create and submit PayHere form
  const form = document.createElement("form");
  form.method = "POST";
  form.action = "https://sandbox.payhere.lk/pay/checkout"; // SANDBOX for testing
  
  // ✅ FIX: Use exact values from hashData that were used to generate the hash
  const fields = {
    merchant_id: hashData.merchant_id,
    return_url: `${frontendUrl}/payment-success`,
    cancel_url: `${frontendUrl}/payment-cancel`,
    notify_url: `${backend}/api/payment/notify`,
    order_id: hashData.order_id,        // ✅ Use hashData, not paymentData
    items: hashData.items || "Order Items",
    currency: hashData.currency,        // ✅ Use hashData, not paymentData
    amount: hashData.amount,            // ✅ Use hashData, not paymentData
    first_name: hashData.first_name,    // ✅ Use hashData
    last_name: hashData.last_name,      // ✅ Use hashData
    email: hashData.email,              // ✅ Use hashData
    phone: hashData.phone,              // ✅ Use hashData
    address: hashData.address,          // ✅ Use hashData
    city: "Colombo",                    // Default city
    country: "Sri Lanka",               // Default country
    hash: hashData.hash,
  };

  console.log("Final fields being sent to PayHere:", fields);

  // Add all fields as hidden inputs
  Object.keys(fields).forEach((key) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = fields[key];
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
}

  return (
    <div className="w-full h-full flex flex-col items-center pt-4 relative ">
      <div className="w-[400px] shadow-2xl absolute top-1 right-1 flex flex-col justify-center items-center p-1 gap-4">
        <p className="text-2xl text-secondary font-bold">
          Total:
          <span className="text-accent font-bold mx-2">
            {getTotals().total.toFixed(2)}
          </span>
        </p>
        <div className="w-full flex flex-col gap-2">
          <input
            type="email"
            placeholder="Email"
            className="w-full h-[40px] px-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Name"
            className="w-full h-[40px] px-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full h-[40px] px-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <input
            type="text"
            placeholder="Address"
            className="w-full h-[40px] px-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button
          className="text-white bg-accent px-4 py-2 rounded-lg font-bold hover:bg-secondary transition-all duration-300"
          onClick={placeOrder}
        >
          Proceed to Payment
        </button>
        <button
          className="text-white bg-red-500 px-4 py-2 rounded-lg font-bold hover:bg-red-600 transition-all duration-300"
          onClick={() => {
            setCart([]);
            toast.success("Cart cleared");
          }}
        >
          Clear Cart
        </button>
      </div>

      {cart.map((item, index) => (
        <div
          key={item.productId ?? item.id ?? item._id ?? index}
          className="w-[600px] my-4 h-[100px] rounded-tl-3xl rounded-bl-3xl bg-primary shadow-2xl flex flex-row relative justify-center items-center"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-[100px] h-[100px] object-cover rounded-3xl"
          />
          <div className="w-[250px] h-full flex flex-col justify-center items-start pl-4">
            <h1 className="text-xl text-secondary font-semibold">{item.name}</h1>
            <h1 className="text-md text-gray-600 font-semibold">
              {String(item.productId ?? item.id ?? item._id ?? "")}
            </h1>
            {Number(item.labelPrice ?? item.labelledPrice ?? 0) > Number(item.price ?? 0) ? (
              <div>
                <span className="text-md mx-1 text-gray-500 line-through">
                  {Number(item.labelPrice ?? item.labelledPrice ?? 0).toFixed(2)}
                </span>
                <span className="text-md mx-1 font-bold text-accent">
                  {Number(item.price ?? 0).toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-md mx-1 font-bold text-accent">
                {Number(item.price ?? 0).toFixed(2)}
              </span>
            )}
          </div>
          <div className="max-w-[100px] w-[100px] h-full flex flex-row justify-evenly items-center">
            <button
              className="text-white font-bold rounded-xl hover:bg-secondary p-2 text-xl cursor-pointer aspect-square bg-accent"
              onClick={() => changeQty(index, -1)}
            >
              <BiMinus />
            </button>
            <h1 className="text-xl text-secondary font-semibold h-full flex items-center mx-2.5">
              {Number(item.qty ?? 1)}
            </h1>
            <button
              className="text-white font-bold rounded-xl hover:bg-secondary p-2 text-xl cursor-pointer aspect-square bg-accent"
              onClick={() => changeQty(index, 1)}
            >
              <BiPlus />
            </button>
          </div>
          <div className="w-[200px] h-full flex flex-col justify-center items-end pr-4">
            <h1 className="text-2xl text-secondary font-semibold">
              Rs. {(Number(item.price ?? 0) * Number(item.qty ?? 1)).toFixed(2)}
            </h1>
          </div>
          <button
            className="absolute text-red-600 cursor-pointer hover:bg-red-600 hover:text-white rounded-full p-2 right-[-35px]"
            onClick={() => removeFromCart(index)}
          >
            <BiTrash />
          </button>
        </div>
      ))}
    </div>
  );
}