document.addEventListener('DOMContentLoaded', () => {
    const cartBtn = document.getElementById('cartButton');
    const cartDrawer = document.getElementById('cartDrawer');
    const closeCart = document.getElementById('closeCart');
    const cartItemsEl = document.getElementById('cartItems');
    const subtotalEl = document.getElementById('cartSubtotal');
    const countEl = document.getElementById('cartCount');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const clearBtn = document.getElementById('clearCartBtn');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const toNumber = (colones) => Number((colones || '').replace(/[^\d]/g, '')) || 0;
    const fmt = (n) => '₡' + (n || 0).toLocaleString('es-CR');

    function updateCart() {
        if (!cart.length) {
            cartItemsEl.innerHTML = '<p class="cart-empty">Tu carrito está vacío.</p>';
        } else {
            cartItemsEl.innerHTML = cart.map(i => `
        <div class="cart-row">
          <div class="cart-row-info">
            <strong>${i.name}</strong>
            <span>${fmt(i.price)} c/u</span>
          </div>
          <div class="cart-row-actions">
            <button class="qty-btn dec" data-id="${i.id}">–</button>
            <span class="qty">${i.qty}</span>
            <button class="qty-btn inc" data-id="${i.id}">+</button>
            <button class="del" data-id="${i.id}" title="Eliminar"><i class="bi bi-trash3"></i></button>
          </div>
        </div>
      `).join('');
        }
        const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
        subtotalEl.textContent = fmt(total);
        countEl.textContent = cart.reduce((s, i) => s + i.qty, 0);
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    cartBtn.addEventListener('click', () => cartDrawer.classList.add('open'));
    closeCart.addEventListener('click', () => cartDrawer.classList.remove('open'));
    clearBtn.addEventListener('click', () => { cart = []; updateCart(); });

    document.body.addEventListener('click', (e) => {
        const add = e.target.closest('.add-to-cart');
        if (add) {
            const card = add.closest('.menu-item');
            if (!card) return;
            const id = Number(card.dataset.id);
            const name = card.querySelector('.item-title')?.textContent.trim() || 'Producto';
            const price = toNumber(card.querySelector('.item-price')?.textContent);

            const found = cart.find(x => x.id === id);
            found ? found.qty++ : cart.push({ id, name, price, qty: 1 });

            updateCart();
            cartDrawer.classList.add('open');
        }

        const inc = e.target.closest('.inc');
        const dec = e.target.closest('.dec');
        const del = e.target.closest('.del');
        if (inc) changeQty(Number(inc.dataset.id), +1);
        if (dec) changeQty(Number(dec.dataset.id), -1);
        if (del) removeItem(Number(del.dataset.id));
    });

    function changeQty(id, d) {
        const it = cart.find(i => i.id === id);
        if (!it) return;
        it.qty += d;
        if (it.qty <= 0) cart = cart.filter(i => i.id !== id);
        updateCart();
    }
    function removeItem(id) {
        cart = cart.filter(i => i.id !== id);
        updateCart();
    }

    checkoutBtn.addEventListener('click', () => {
        if (!cart.length) return;
        const lines = cart.map(i => `• ${i.name} x${i.qty} - ${fmt(i.price * i.qty)}`).join('%0A');
        const total = fmt(cart.reduce((s, i) => s + i.price * i.qty, 0));
        const msg = `¡Hola! Quiero realizar este pedido:%0A%0A${lines}%0A%0ATotal: ${total}`;
        window.open(`https://wa.me/50663199969?text=${msg}`, '_blank');
    });

    // Smooth scroll para anclas
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const t = document.querySelector(a.getAttribute('href'));
            if (!t) return;
            e.preventDefault();
            const headerH = document.querySelector('.header')?.offsetHeight || 0;
            const y = t.getBoundingClientRect().top + window.scrollY - headerH - 8;
            window.scrollTo({ top: y, behavior: 'smooth' });
        });
    });

    updateCart();
});
