// Load saved cart from localStorage if it exists, otherwise start fresh
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function toggleDetails(button) {
  const card = button.parentElement;
  const details = card.querySelector('.details');
  
  if (details) {
    if (details.style.display === "none" || details.style.display === "") {
      details.style.display = "block";
      button.textContent = "Hide Details";
    } else {
      details.style.display = "none";
      button.textContent = "View Details";
    }
  }
}

function addToCart(button) {
  const card = button.parentElement;
  const productName = card.querySelector("h3").textContent;
  
  // Grab the price text and remove the "$"
  const priceText = card.querySelector(".price").textContent;
  const price = parseFloat(priceText.replace("$", ""));

  // Grab the image source
  const imgSrc = card.querySelector("img").getAttribute("src");

  // Grab the selected quantity from the input field (defaults to 1 if missing)
  const qtyInput = card.querySelector(".qty-input");
  const quantityToAdd = qtyInput ? parseInt(qtyInput.value) || 1 : 1;

  // Check if item exists already in the cart
  let found = false;
  for (let item of cart) {
    if (item.name === productName) {
      item.quantity += quantityToAdd;
      found = true;
      break;
    }
  }
  if (!found) {
    cart.push({ name: productName, price: price, quantity: quantityToAdd, image: imgSrc });
  }

  // Save the updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  alert(quantityToAdd + " " + productName + "(s) added to cart!");
}

function removeFromCart(button) {
  const card = button.parentElement;
  const productName = card.querySelector("h3").textContent;

  // Filter out this product from the cart array
  cart = cart.filter(item => item.name !== productName);

  // Save the updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Reset quantity input back to 1 if desired
  const qtyInput = card.querySelector(".qty-input");
  if (qtyInput) {
    qtyInput.value = 1;
  }

  alert(productName + " removed from cart!");
}
