// Load saved cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  const cartContainer = document.getElementById("cart-items");
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span>${item.name}</span>
      <span>$${item.price.toFixed(2)}</span>
      <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)">
      <button onclick="removeItem(${index})">Remove</button>
    `;
    cartContainer.appendChild(div);
  });

  updateTotal();
}

function updateQuantity(index, newQty) {
  cart[index].quantity = parseInt(newQty);
  saveAndRender();
}

function removeItem(index) {
  cart.splice(index, 1);
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
