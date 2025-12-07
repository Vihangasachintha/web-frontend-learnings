export function getCart() {
  const cart = localStorage.getItem("cart");

  if (!cart) {
    const empty = [];
    localStorage.setItem("cart", JSON.stringify(empty));
    return empty;
  }

  try {
    return JSON.parse(cart);
  } catch (e) {
    console.error("Invalid cart data, resetting...");
    localStorage.setItem("cart", JSON.stringify([]));
    return [];
  }
}

export function addToCart(product, qty) {
  let cart = getCart();

  let index = cart.findIndex((item) => item.productId === product.productId);

  if (index === -1) {
    cart.push({
      productId: product._id || product.productId || product.id,
      name: product.name,
      price: product.price,
      qty: qty,
      labelledPrice: product.labelPrice || product.labelledPrice,
      image: product.images?.[0] || product.image,
    });
  } else {
    const newQty = cart[index].qty + qty;

    if (newQty <= 0) {
      removeFromCart(product.productId);
      return;
    }

    cart[index].qty = newQty;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

export function removeFromCart(productId) {
  let cart = getCart();

  const newCart = cart.filter((item) => item.productId !== productId);

  localStorage.setItem("cart", JSON.stringify(newCart));
}

export function getTotal() {
  let cart = getCart();
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}
