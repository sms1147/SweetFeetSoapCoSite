// Load saved cart from localStorage if it exists, otherwise start fresh
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(button) {
  const productName = button.parentElement.querySelector("h3").textContent;
  
  // Grab the price text from the .price element in the same card and remove the "$"
  const priceText = button.parentElement.querySelector(".price").textContent;
  const price = parseFloat(priceText.replace("$", ""));

  // Check if item exists already
  let found = false;
  for (let item of cart) {
    if (item.name === productName) {
      item.quantity++;
      found = true;
      break;
    }
  }
  if (!found) {
    cart.push({ name: productName, price: price, quantity: 1 });
  }

  // Save the updated cart to localStorage so cart.html can read it
  localStorage.setItem("cart", JSON.stringify(cart));

  alert(productName + " added to cart!");
}
