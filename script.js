const cartCountEl = document.getElementById('cart-count');
const viewCartBtn = document.getElementById('view-cart-btn');
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count
function updateCartCount() {
  cartCountEl.textContent = cart.length;
}
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

// Add to cart
document.querySelectorAll('.product-card').forEach(card => {
  const button = card.querySelector('button');
  button.addEventListener('click', () => {
    const id = card.dataset.id;
    const name = card.dataset.name;
    const price = card.dataset.price;

    cart.push({ id, name, price });
    saveCart();

    alert(`${name} added to cart!`);
  });
});

// View cart popup with remove option
viewCartBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const popup = document.createElement('div');
  popup.id = 'cart-popup';

  const cartTitle = document.createElement('h3');
  cartTitle.textContent = 'Your Cart';
  popup.appendChild(cartTitle);

  if (cart.length === 0) {
    popup.innerHTML += '<p>Your cart is empty.</p>';
  } else {
    const ul = document.createElement('ul');

    cart.forEach((item, index) => {
      const li = document.createElement('li');
      li.innerHTML = `${item.name} - $${item.price} <button class="remove-btn" data-index="${index}">Remove</button>`;
      ul.appendChild(li);
    });

    popup.appendChild(ul);
  }

  const closeBtn = document.createElement('button');
  closeBtn.id = 'close-cart';
  closeBtn.textContent = 'Close';
  closeBtn.addEventListener('click', () => popup.remove());

  popup.appendChild(closeBtn);
  document.body.appendChild(popup);

  // Handle removal of items
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.dataset.index);
      cart.splice(index, 1);
      saveCart();
      popup.remove();      // Close current popup
      viewCartBtn.click(); // Re-open with updated cart
    });
  });
});

// Category filtering (Home / Men / Women / Kids)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const category = link.dataset.category;

    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
      const cardCategory = card.dataset.category;
      if (category === 'all' || cardCategory === category) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });

    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// On page load
updateCartCount();
