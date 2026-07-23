let cart = [];

function renderCart() {
  const cartContainer = document.getElementById("cart-items");
  cartContainer.innerHTML = "";

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
  updateTotal();
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

function updateTotal() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById("cart-total").textContent = `Total: $${total.toFixed(2)}`;
}

document.getElementById("checkout-btn").addEventListener("click", () => {
  alert("Proceeding to checkout!");
});

renderCart();
