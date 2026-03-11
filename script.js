const products = [
  {
    id: "coffee-beans",
    name: "Café en grain (250g)",
    price: 8,
    description:
      "Assemblage premium aux notes chocolatées, torréfié pour les espresso et méthodes douces.",
  },
  {
    id: "mug",
    name: "Mug Brew&Byte",
    price: 14,
    description: "Mug céramique signature, design minimaliste avec liseré néon discret.",
  },
  {
    id: "tshirt",
    name: "T-shirt Brew&Byte",
    price: 24,
    description: "Coupe unisexe confortable, coton doux avec logo brodé Brew&Byte.",
  },
  {
    id: "plush",
    name: "Peluche Brew&Byte",
    price: 19,
    description: "Compagnon cosy collector inspiré de notre univers café & tech.",
  },
];

const productsContainer = document.getElementById("products");
const cartDrawer = document.getElementById("cart-drawer");
const openCartBtn = document.getElementById("open-cart");
const closeCartBtn = document.getElementById("close-cart");
const cartItemsList = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const checkoutMsg = document.getElementById("checkout-msg");
const aiBtn = document.getElementById("ai-create");
const aiMessage = document.getElementById("ai-message");

const modal = document.getElementById("product-modal");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalPrice = document.getElementById("modal-price");
const modalClose = document.getElementById("modal-close");

const cart = [];

function euro(amount) {
  return `${amount.toFixed(2)}€`;
}

function renderProducts() {
  productsContainer.innerHTML = "";
  products.forEach((product) => {
    const card = document.createElement("article");
    card.className = "card product-card";
    card.dataset.view = product.id;
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", `Voir l’aperçu de ${product.name}`);
    card.innerHTML = `
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <div class="product-meta">
        <strong>${euro(product.price)}</strong>
        <div>
          <button class="btn btn-secondary" data-view="${product.id}">Voir</button>
          <button class="btn btn-primary" data-add="${product.id}">Ajouter</button>
        </div>
      </div>
    `;
    productsContainer.appendChild(card);
  });
}

function openProductModal(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  modalTitle.textContent = product.name;
  modalDesc.textContent = product.description;
  modalPrice.textContent = `Prix : ${euro(product.price)}`;
  modal.showModal();
}

function updateCart() {
  cartItemsList.innerHTML = "";
  let total = 0;

  if (!cart.length) {
    const empty = document.createElement("li");
    empty.textContent = "Votre panier est vide.";
    cartItemsList.appendChild(empty);
  }

  cart.forEach((item) => {
    total += item.price;
    const row = document.createElement("li");
    row.innerHTML = `<span>${item.name}</span><strong>${euro(item.price)}</strong>`;
    cartItemsList.appendChild(row);
  });

  cartCount.textContent = String(cart.length);
  cartTotal.textContent = euro(total);
}

function openCart() {
  cartDrawer.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
}

function closeCart() {
  cartDrawer.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
}

productsContainer.addEventListener("click", (event) => {
  const addButton = event.target.closest("[data-add]");
  if (addButton) {
    const product = products.find((p) => p.id === addButton.dataset.add);
    cart.push(product);
    updateCart();
    openCart();
    return;
  }

  const viewTrigger = event.target.closest("[data-view]");
  if (viewTrigger) {
    openProductModal(viewTrigger.dataset.view);
  }
});

productsContainer.addEventListener("keydown", (event) => {
  const isActionKey = event.key === "Enter" || event.key === " ";
  if (!isActionKey) return;

  const viewTrigger = event.target.closest("[data-view]");
  if (viewTrigger) {
    event.preventDefault();
    openProductModal(viewTrigger.dataset.view);
  }
});

openCartBtn.addEventListener("click", openCart);
closeCartBtn.addEventListener("click", closeCart);

checkoutBtn.addEventListener("click", () => {
  if (!cart.length) {
    checkoutMsg.textContent = "Ajoutez au moins un produit pour finaliser le paiement.";
    return;
  }

  checkoutMsg.textContent =
    "Paiement simulé réussi ✅ Merci pour votre commande Brew&Byte.";
  cart.length = 0;
  updateCart();
});

aiBtn.addEventListener("click", () => {
  const suggestions = [
    "Latte vanille-coco avec mousse infusée au matcha.",
    "Cold brew caramel-noisette, perles fruit de la passion.",
    "Thé glacé pêche-yuzu avec shot espresso floral.",
    "Création chaude cacao blanc & espresso au sirop lavande.",
  ];
  const pick = suggestions[Math.floor(Math.random() * suggestions.length)];
  aiMessage.textContent = `Suggestion IA du jour : ${pick}`;
});

modalClose.addEventListener("click", () => modal.close());

document.querySelector(".contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  event.target.reset();
  alert("Merci ! Nous vous répondrons rapidement.");
});

renderProducts();
updateCart();


const authTabs = document.querySelectorAll(".auth-tab");
const authPanels = document.querySelectorAll(".auth-form");
const authMessage = document.getElementById("auth-message");

authTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    authTabs.forEach((btn) => {
      btn.classList.remove("active");
      btn.setAttribute("aria-selected", "false");
    });

    authPanels.forEach((panel) => panel.classList.add("hidden"));

    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");

    const selected = tab.dataset.tab;
    const panel = document.querySelector(`[data-panel="${selected}"]`);
    panel.classList.remove("hidden");
  });
});

document.getElementById("login-form").addEventListener("submit", (event) => {
  event.preventDefault();
  authMessage.textContent = "Connexion simulée réussie. Bon retour chez Brew&Byte ✨";
  event.target.reset();
});

document.getElementById("register-form").addEventListener("submit", (event) => {
  event.preventDefault();
  authMessage.textContent = "Inscription simulée validée. Bienvenue dans la communauté Brew&Byte 🚀";
  event.target.reset();
});
