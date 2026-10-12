(function () {
  const cartButton = document.getElementById("cart-button");
  const cartPanel = document.getElementById("cart-panel");
  const cartClose = document.getElementById("cart-close");
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");
  const orderMessage = document.getElementById("order-message");

  if (!cartButton || !cartPanel || !cartItems) {
    console.warn("Basket HTML not found in index.html");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function formatPrice(amount) {
    return "KSh " + amount.toLocaleString();
  }

  function renderCart() {
    cartItems.innerHTML = "";

    if (cart.length === 0) {
      cartItems.innerHTML = "<p class='cart-empty'>Your order is empty. Add something from the menu.</p>";
    }

    cart.forEach(function (item, index) {
      cartItems.innerHTML += `
        <div class="cart-item">
          <div>
            <p class="cart-item-name">${item.name}</p>
            <p class="cart-item-price">${formatPrice(item.price)} each</p>
          </div>
          <div class="qty-controls">
            <button class="qty-btn" data-action="minus" data-index="${index}" aria-label="Remove one ${item.name}">-</button>
            <span>${item.qty}</span>
            <button class="qty-btn" data-action="plus" data-index="${index}" aria-label="Add one ${item.name}">+</button>
          </div>
        </div>
      `;
    });

    const totalItems = cart.reduce(function (sum, item) {
      return sum + item.qty;
    }, 0);

    const totalPrice = cart.reduce(function (sum, item) {
      return sum + item.price * item.qty;
    }, 0);

    cartCount.textContent = totalItems;
    cartTotal.textContent = formatPrice(totalPrice);
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function addToCart(name, price) {
    const existing = cart.find(function (item) {
      return item.name === name;
    });

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ name: name, price: price, qty: 1 });
    }

    renderCart();
  }

  document.addEventListener("click", function (event) {
    const addBtn = event.target.closest(".add-btn");
    if (!addBtn) {
      return;
    }

    addToCart(addBtn.dataset.name, Number(addBtn.dataset.price));

    addBtn.textContent = "Added";
    setTimeout(function () {
      addBtn.textContent = "Add to order";
    }, 800);
  });

  cartItems.addEventListener("click", function (event) {
    const btn = event.target.closest(".qty-btn");
    if (!btn) {
      return;
    }

    const index = Number(btn.dataset.index);

    if (btn.dataset.action === "plus") {
      cart[index].qty += 1;
    } else {
      cart[index].qty -= 1;
      if (cart[index].qty === 0) {
        cart.splice(index, 1);
      }
    }

    renderCart();
  });

  cartButton.addEventListener("click", function () {
    orderMessage.hidden = true;
    cartPanel.hidden = false;
  });

  cartClose.addEventListener("click", function () {
    cartPanel.hidden = true;
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      cartPanel.hidden = true;
    }
  });

  document.getElementById("clear-cart").addEventListener("click", function () {
    cart = [];
    orderMessage.hidden = true;
    renderCart();
  });

  document.getElementById("place-order").addEventListener("click", function () {
    if (cart.length === 0) {
      orderMessage.textContent = "Your order is empty. Add an item from the menu first.";
      orderMessage.hidden = false;
      return;
    }

    const totalPrice = cart.reduce(function (sum, item) {
      return sum + item.price * item.qty;
    }, 0);

    orderMessage.textContent =
      "Thank you! Your order of " + cartCount.textContent + " item(s), total " +
      formatPrice(totalPrice) + ", has been received. We will call to confirm.";
    orderMessage.hidden = false;

    cart = [];
    renderCart();
  });

  renderCart();
})();