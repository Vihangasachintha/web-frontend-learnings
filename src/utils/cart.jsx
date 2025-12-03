export function getCart() {
  let cart = localStorage.getItem("cart");

  if (!cart) {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    return JSON.parse(cart);
  }
  return cart;
}

export function addToCart(product, qty) {
  let cart = getCart();

  let index = cart.findIndex((item) => {
    return item.productId === product.productId;
  });

  if (index === -1) {
    cart.push({
      productId: product.productId,
      name: product.name,
      price: product.price,
      qty: qty,
      labelledPrice: product.labelPrice,
      image: product.images[0],
    });
  } else {
    const newQty = cart[index].qty + qty;
    if (newQty <= 0) {
      removeFromCart(product.productId);
      return;
    } else {
      cart[index].qty = newQty;
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

export function removeFromCart(productId) {
  let cart = getCart();

  const newCart = cart.filter((item) => {
    return item.productId !== productId;
  });

  localStorage.setItem("cart", JSON.stringify(newCart));
}
