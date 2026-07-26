// Load saved cart from localStorage if it exists, otherwise start fresh
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function toggleDetails(button) {
  // Finds the .details div inside the exact product card container
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

  // Grab the image source so the cart can display it
  const imgSrc = card.querySelector("img").getAttribute("src");

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
    cart.push({ name: productName, price: price, quantity: 1, image: imgSrc });
  }

  // Save the updated cart to localStorage so cart.html can read it
  localStorage.setItem("cart", JSON.stringify(cart));

  alert(productName + " added to cart!");
}
