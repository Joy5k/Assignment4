const cart = [];

export const addToCart = (product, quantity) => {
  const item = { product, quantity };
  cart.push(item);
};

export const removeCartItem = (productId) => {
  const itemIndex = cart.findIndex((item) => item.product.id === productId);
  if (itemIndex !== -1) {
    cart.splice(itemIndex, 1);
  }
};

export const clearCart = () => {
  cart.length = 0;
};

export const increaseCartItemQuantity = (productId) => {
  const item = cart.find((item) => item.product.id === productId);
  if (item) {
    item.quantity++;
  }
};

export const decreaseCartItemQuantity = (productId) => {
  const item = cart.find((item) => item.product.id === productId);
  if (item && item.quantity > 1) {
    item.quantity--;
  }
};

export default cart;