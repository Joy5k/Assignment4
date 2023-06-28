
// app.js
import products from './product.js';
import cart, { addToCart, removeCartItem, clearCart, increaseCartItemQuantity, decreaseCartItemQuantity } from './cart.js';

const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartItemsContainer = document.querySelector("#AddedProducts");
const totalAmountElement = document.querySelector(".total-amount");
const clearCartButton = document.querySelector(".clear-cart");

addToCartButtons.forEach((button) => {
  button.addEventListener("click", handleAddToCart);
});

clearCartButton.addEventListener("click", handleClearCart);


function handleAddToCart(event) {
  const productId = parseInt(event.target.dataset.productId);
  const product = products.find((p) => p.id === productId);

  if (product) {
    const existingCartItem = cart.find((item) => item.product.id === productId);
    if (existingCartItem) {
      increaseCartItemQuantity(productId);
    } else {
      addToCart(product, 1);
    }
    displayCartItems();
  }
}

displayCartItems();


function handleClearCart() {
  clearCart();
  displayCartItems();
}

function displayCartItems() {
  cartItemsContainer.innerHTML = "";
  let totalAmount = 0;

  cart.forEach((cartItem) => {
    const { product, quantity } = cartItem;
    const totalPrice = product.price * quantity;
    totalAmount += totalPrice;
    const cartItemElement = document.createElement("tr");
    cartItemElement.innerHTML = `
      <tr>
        <td>Name: ${product.name}</td>
        <td>Quantity: ${quantity}</td>
        <td>Price: ${product.price}</td>
        <td>Total: ${totalPrice}</td>
        <button class="remove-item btn btn-danger " data-product-id="${product.id}">Remove</button>
      </tr>
    `;
    cartItemsContainer.appendChild(cartItemElement);
  });

  totalAmountElement.textContent = `Total Amount: $${totalAmount.toFixed(2)}`;

  const removeItemButtons = document.querySelectorAll(".remove-item");
  removeItemButtons.forEach((button) => {
    button.addEventListener("click", handleRemoveItem);
  });
}

function handleRemoveItem(event) {
  const productId = parseInt(event.target.dataset.productId);
  removeCartItem(productId);
  displayCartItems();
}

export function updateCartItemQuantity(productId, newQuantity) {
  if (newQuantity >= 0) {
    const item = cart.find((item) => item.product.id === productId);
    if (item) {
      item.quantity = newQuantity;
      displayCartItems();
    }
  }
}

export function handleIncreaseQuantity(productId) {
  const item = cart.find((item) => item.product.id === productId);
  console.log(item,'from the 80 handleIncreaseQuantity');
  if (item) {
    const newQuantity = item.quantity + 1;
    updateCartItemQuantity(productId, newQuantity);
  }
}

export function handleDecreaseQuantity(productId) {
  const item = cart.find((item) => item.product.id === productId);
  if (item && item.quantity > 0) {
    const newQuantity = item.quantity - 1;
    updateCartItemQuantity(productId, newQuantity);
  }
}

displayCartItems();