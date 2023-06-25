const products = [
    { id: 1, name: "Product 1", price: 10 },
    { id: 2, name: "Product 2", price: 20 }
  ];

  // Cart
  const cart = [];

  // Event listeners for "Add to Cart" buttons
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", handleAddToCart);
  });

  // Function to add product to cart
  function handleAddToCart(event) {
    const productId = parseInt(event.target.dataset.productId);
      const product = products.find((p) => p.id === productId);
      console.log('clicked',event.target.dataset.productId);

    if (product) {
      const quantity = 1;
      addToCart(product, quantity);
      displayCartItems();
    }
  }

  // Function to add product to cart
  function addToCart(product, ...quantities) {
    cart.push({ product, quantities });
  }

  // Function to display cart items
  function displayCartItems() {
    const cartItemsContainer = document.querySelector("#AddedProducts");
    cartItemsContainer.innerHTML = "";

    let totalAmount = 0;

    cart.forEach((cartItem) => {
      const { product, quantities } = cartItem;
      const quantity = quantities.reduce((sum, current) => sum + current, 0);
      const totalPrice = product.price * quantity;
      totalAmount += totalPrice;
      const cartItemElement = document.createElement("tr");
    //   cartItemElement.classList.add("cart-item");
      cartItemElement.innerHTML = `
        <tr>
        <td>${product.name}</td>
        <td>Quantity: ${quantity}</td>
        <td>Price: ${product.price}</td>
        <td>Total: ${totalAmount}</td>
       
      </tr>


        `;
      cartItemsContainer.appendChild(cartItemElement);
    });

    const totalAmountElement = document.querySelector(".total-amount");
    totalAmountElement.textContent = `Total Amount: $${totalAmount.toFixed(2)}`;
  }

  // Event listener for "Clear Cart" button
  const clearCartButton = document.querySelector(".clear-cart");
  clearCartButton.addEventListener("click", handleClearCart);

  // Function to clear the cart
  function handleClearCart() {
    cart.length = 0;
    displayCartItems();
  }
