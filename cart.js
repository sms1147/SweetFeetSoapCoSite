/*
Author: Shelly Smith
Date: June 2026
File Name: cart.js
*/

// Load saved cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  const cartContainer = document.getElementById("cart-items");
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    updateTotal();
    return;
  }

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "cart-item-card";
    div.innerHTML = `
      <div class="cart-item-image">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="cart-item-info">
        <span class="item-name">${item.name}</span>
        <span class="item-price">$${item.price.toFixed(2)}</span>
      </div>
      <div class="cart-item-qty">
        <label for="qty-${index}">Quantity:</label>
        <input type="number" id="qty-${index}" min="1" max="999" value="${item.quantity}" class="qty-input" onchange="updateQuantity(${index}, this.value)">
      </div>
      <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
    `;
    cartContainer.appendChild(div);
  });

  updateTotal();
}

function updateQuantity(index, newQty) {
  let qty = parseInt(newQty);
  if (isNaN(qty) || qty < 1) qty = 1;
  if (qty > 999) qty = 999;
  cart[index].quantity = qty;
  saveAndRender();
}

function removeItem(index) {
  cart.splice(index, 1);
  saveAndRender();
}

function addToCartFromCart(button) {
  const itemContainer = button.closest(".recommended-item");
  const name = itemContainer.querySelector(".rec-name").textContent;
  const priceText = itemContainer.querySelector(".price").textContent;
  const price = parseFloat(priceText.replace("$", ""));
  const image = itemContainer.querySelector("img").getAttribute("src");

  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, image, quantity: 1 });
  }

  saveAndRender();
}
  

function updateTotal() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById("cart-total").textContent = `Total: $${total.toFixed(2)}`;
}

// Helper function to save changes to localStorage and re-draw the cart
function saveAndRender() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

const checkoutBtn = document.getElementById("checkout-btn");
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
    } else {
      alert("Proceeding to checkout!");
    }
  });
}

renderCart();
