// menu.js - Funcionalidades específicas para la página del menú
document.addEventListener('DOMContentLoaded', function() {
    // Función auxiliar para animar contadores
    function animateCounter(element, target, suffix = '') {
        let current = 0;
        const increment = target / 30;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, 50);
    }

    // Contador animado para stats del hero del menú
    function animateMenuStats() {
        const stats = document.querySelectorAll('.menu-hero .stat-number');
        if (stats.length >= 3) {
            animateCounter(stats[0], 100, '%');
            animateCounter(stats[1], 8, '+');
            animateCounter(stats[2], 50, '+');
        }
    }

    // Navegación suave entre categorías
    document.querySelectorAll('.category-card, .nav a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Resaltar categoría activa
                    highlightActiveCategory(href);
                }
            }
        });
    });

    // Función para resaltar categoría activa
    function highlightActiveCategory(categoryId) {
        document.querySelectorAll('.category-card').forEach(card => {
            card.classList.remove('active');
        });
        
        const activeCard = document.querySelector(`[href="${categoryId}"]`);
        if (activeCard) {
            activeCard.classList.add('active');
        }
    }

    // Observer para animaciones de categorías
    const categoryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'all 0.6s ease-out';
                
                // Resaltar categoría en vista
                const categoryId = '#' + entry.target.id;
                highlightActiveCategory(categoryId);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });

    // Observar categorías del menú
    document.querySelectorAll('.menu-category').forEach(category => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(30px)';
        categoryObserver.observe(category);
    });

    // Funcionalidad de favoritos
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            
            const itemTitle = this.closest('.menu-item').querySelector('.item-title').textContent;
            if (this.classList.contains('active')) {
                showNotification(`"${itemTitle}" agregado a favoritos`, 'success');
            } else {
                showNotification(`"${itemTitle}" removido de favoritos`, 'info');
            }
        });
    });

    // Notificación temporal
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="bi bi-${type === 'success' ? 'check-circle' : 'info-circle'} me-2"></i>
            ${message}
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 30px;
            background: white;
            color: #333;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 10000;
            border-left: 4px solid ${type === 'success' ? 'var(--success)' : 'var(--sea-teal)'};
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        // Animación de entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto-remover después de 3 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Iniciar contadores cuando el hero sea visible
    const menuHeroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateMenuStats();
                menuHeroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const menuHero = document.querySelector('.menu-hero');
    if (menuHero) {
        menuHeroObserver.observe(menuHero);
    } else {
        console.warn('Elemento .menu-hero no encontrado');
    }

    // Efectos de hover mejorados para items del menú
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });

    // Filtrado por categorías (para futura implementación)
    function filterMenu(category) {
        const allItems = document.querySelectorAll('.menu-item');
        const categories = document.querySelectorAll('.menu-category');
        
        if (category === 'all') {
            allItems.forEach(item => item.style.display = 'block');
            categories.forEach(cat => cat.style.display = 'block');
        } else {
            categories.forEach(cat => {
                if (cat.id === category) {
                    cat.style.display = 'block';
                } else {
                    cat.style.display = 'none';
                }
            });
        }
        
        // Scroll to top después de filtrar
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    console.log('🍽️ Menú premium cargado correctamente');
});

// Funciones globales específicas del menú
function addToCart(itemName, price) {
    const message = `¡Hola! Quiero agregar a mi pedido: ${itemName} - ₡${price}`;
    const url = `https://wa.me/50663199969?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

function customizeItem(itemName) {
    // Para futura implementación de personalización de platillos
    console.log(`Personalizando: ${itemName}`);
    showNotification(`Próximamente podrás personalizar "${itemName}"`, 'info');
}