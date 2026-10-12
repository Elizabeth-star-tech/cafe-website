const menuItems = [
  {
    id: 1,
    name: "Burger",
    category: "Fast Food",
    description: "Grilled beef patty, cheese, lettuce and tomato in a toasted bun.",
    price: 650,
    image: "images/burger.jpg"
  },
  {
    id: 2,
    name: "cake",
    category: "Desserts",
    description: "A rich, moist slice of chocolate cake with creamy frosting.",
    price: 400,
    image: "images/cake.jpg"
  },
  {
    id: 3,
    name: "cappuccino",
    category: "Coffee",
    description: "Espresso with steamed milk and a thick layer of foam.",
    price: 300,
    image: "images/cappuccino.jpg"
  },
  {
    id: 4,
    name: "Grilled Meat",
    category: "Main Courses",
    description: "Tender grilled meat served with rice and vegetables.",
    price: 600,
    image: "images/grilled-meat.jpg"
  },
  {
    id: 5,
    name: "Iced-latte",
    category: "Beverages",
    description: "Chilled espresso and milk over ice, smooth and refreshing.",
    price: 350,
    image: "images/iced-latte.jpg"
  },
  {
    id: 6,
    name: "Mango Juice",
    category: "Beverages",
    description: "Pressed from ripe mangoes, with no added sugar.",
    price: 250,
    image: "images/mango-juice.jpg"
  },
  {
    id: 7,
    name: " chefs pilau",
    category: "Special Dishes",
    description: "Fragrant spiced rice cooked with tender beef and served with a fresh salad.",
    price: 700,
    image: "images/pilau.jpg"
  },
  {
    id: 8,
    name: "Masala Tea",
    category: "Beverages",
    description: "Spiced milk tea brewed slowly with ginger and cardamom.",
    price: 200,
    image: "images/tea.jpg"
  },
  {
    id: 9,
    name: "Grilled Tilapia Platter",
    category: "Special Dishes",
    description: "Whole grilled tilapia served with ugali, kachumbari and greens.",
    price: 900,
    image: "images/tilapia.jpg"
  },
  {
    id: 10,
    name: "wrap sandwich",
    category: "Special Dishes",
    description: "A delicious wrap filled with your choice of meat or vegetables, served with a side of fries.",
    price: 500,
    image: "images/wrap-sandwich.jpg"
  }
];

const menuGrid = document.getElementById("menu-grid");
const menuTabButtons = document.querySelectorAll(".menu-tab");

function displayMenu(category) {
  const list = category === "All"
    ? menuItems
    : menuItems.filter(function (item) {
        return item.category === category;
      });

  menuGrid.innerHTML = "";

  list.forEach(function (item) {
    menuGrid.innerHTML += `
      <article class="menu-card">
        <img src="${item.image}" alt="${item.name}">
        <div class="menu-info">
          <div class="menu-title-row">
            <h3>${item.name}</h3>
            <span class="menu-price">KSh ${item.price}</span>
          </div>
          <p>${item.description}</p>
          <button class="add-btn" data-name="${item.name}" data-price="${item.price}">Add to order</button>
        </div>
      </article>
    `;
  });
}

menuTabButtons.forEach(function (tab) {
  tab.addEventListener("click", function () {
    menuTabButtons.forEach(function (t) {
      t.classList.remove("active");
    });
    tab.classList.add("active");
    displayMenu(tab.dataset.category);
  });
});

displayMenu("All");