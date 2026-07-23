let cart = [];

function addToCart(button) {
  const productName = button.parentElement.querySelector("h3").textContent;
  const price = parseFloat(button.dataset.price);

  <!--Check if item exists already-->
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
  alert(productName + " added to cart!");
}
