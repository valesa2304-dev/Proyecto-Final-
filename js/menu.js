document.addEventListener('DOMContentLoaded', () => {
  const cartBtn = document.getElementById('cartButton');
  const cartDrawer = document.getElementById('cartDrawer');
  const closeCartBtn = document.getElementById('closeCart');
  const cartItemsEl = document.getElementById('cartItems');
  const subtotalEl = document.getElementById('cartSubtotal');
  const countEl = document.getElementById('cartCount');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const clearCartBtn = document.getElementById('clearCartBtn');

  let cart = JSON.parse(localStorage.getItem('ceviche_cart') || '[]');

  const toNumber = (colones) =>
    Number(String(colones || '').replace(/[^\d]/g, '')) || 0;

  const fmt = (n) => '₡' + (n || 0).toLocaleString('es-CR');

  function saveCart() {
    localStorage.setItem('ceviche_cart', JSON.stringify(cart));
  }

  function updateCart() {
    if (!cart.length) {
      cartItemsEl.innerHTML = '<p class="cart-empty">Tu carrito está vacío.</p>';
    } else {
      cartItemsEl.innerHTML = cart
        .map(
          (i) => `
        <div class="cart-row">
          <div class="cart-row-info">
            <strong>${i.name}</strong>
            <span>${fmt(i.price)} c/u</span>
          </div>
          <div class="cart-row-actions">
            <button class="qty-btn dec" data-id="${i.id}">–</button>
            <span class="qty">${i.qty}</span>
            <button class="qty-btn inc" data-id="${i.id}">+</button>
            <button class="del" data-id="${i.id}" title="Eliminar">
              <i class="bi bi-trash3"></i>
            </button>
          </div>
        </div>`
        )
        .join('');
    }

    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    subtotalEl.textContent = fmt(total);
    countEl.textContent = cart.reduce((s, i) => s + i.qty, 0);

    saveCart();
  }

  function changeQty(id, delta) {
    const item = cart.find((i) => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter((i) => i.id !== id);
    }
    updateCart();
  }

  function removeItem(id) {
    cart = cart.filter((i) => i.id !== id);
    updateCart();
  }

  if (cartBtn && cartDrawer && closeCartBtn) {
    cartBtn.addEventListener('click', () => {
      cartDrawer.classList.add('open');
    });

    closeCartBtn.addEventListener('click', () => {
      cartDrawer.classList.remove('open');
    });
  }

  clearCartBtn?.addEventListener('click', () => {
    cart = [];
    updateCart();
  });

  checkoutBtn?.addEventListener('click', () => {
    if (!cart.length) return;
    const lines = cart
      .map(
        (i) =>
          `• ${i.name} x${i.qty} - ${fmt(i.price * i.qty)}`
      )
      .join('%0A');

    const total = fmt(cart.reduce((s, i) => s + i.price * i.qty, 0));
    const msg = `Hola, quiero realizar este pedido desde la página:%0A%0A${lines}%0A%0ATotal aproximado: ${total}`;
    window.open(`https://wa.me/50663199969?text=${msg}`, '_blank');
  });

  document.body.addEventListener('click', (e) => {
    const addBtn = e.target.closest('.add-to-cart');
    const incBtn = e.target.closest('.inc');
    const decBtn = e.target.closest('.dec');
    const delBtn = e.target.closest('.del');

    if (addBtn) {
      const card = addBtn.closest('.menu-item');
      if (!card) return;

      const id = Number(card.dataset.id);
      const name =
        card.querySelector('.item-title')?.textContent.trim() || 'Producto';
      const price = toNumber(
        card.querySelector('.item-price')?.textContent || ''
      );

      const existing = cart.find((i) => i.id === id);
      if (existing) {
        existing.qty++;
      } else {
        cart.push({ id, name, price, qty: 1 });
      }
      updateCart();
    }

    if (incBtn) {
      changeQty(Number(incBtn.dataset.id), +1);
    }

    if (decBtn) {
      changeQty(Number(decBtn.dataset.id), -1);
    }

    if (delBtn) {
      removeItem(Number(delBtn.dataset.id));
    }
  });

  // Carga dinámica de especialidades desde menu.json (jQuery)
  if (window.jQuery) {
    const $grid = $('#grid-especiales');
    if ($grid.length) {
      $.getJSON('menu.json')
        .done((data) => {
          data.forEach((item) => {
            const badge = item.tag
              ? `<div class="item-badge popular">${item.tag}</div>`
              : '';
            const cardHtml = `
            <div class="menu-item" data-id="${item.id}">
              ${badge}
              <div class="item-image">
                <img src="${item.image}" alt="${item.alt || ''}">
              </div>
              <div class="item-content">
                <div class="item-header">
                  <h3 class="item-title">${item.name}</h3>
                  <span class="item-price">₡${item.price.toLocaleString('es-CR')}</span>
                </div>
                <p class="item-description">${item.desc || ''}</p>
                <div class="item-actions">
                  <button class="btn btn-accent add-to-cart">
                    <i class="bi bi-cart-plus"></i> Agregar
                  </button>
                </div>
              </div>
            </div>`;
            $grid.append(cardHtml);
          });
        })
        .fail(() => {
          console.error('No se pudo cargar menu.json para la sección especiales.');
        });
    }
  }

  updateCart();
});
