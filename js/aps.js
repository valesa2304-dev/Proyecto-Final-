// app.js - Funcionalidades premium mejoradas
document.addEventListener('DOMContentLoaded', function() {
    // Actualizar año en el footer
    const yearElements = document.querySelectorAll('#year, .footer-bottom p');
    yearElements.forEach(el => {
        if (el) {
            const currentYear = new Date().getFullYear();
            el.innerHTML = el.innerHTML.replace('2024', currentYear);
        }
    });

    // WhatsApp Links centralizados
    const phone = '50663199969';
    const defaultMessage = encodeURIComponent('¡Hola! Quiero información del menú de Cevichería El Pueblo.');
    const whatsappUrl = `https://wa.me/${phone}?text=${defaultMessage}`;
    
    // Aplicar a todos los elementos con estas clases
    document.querySelectorAll('[data-whatsapp]').forEach(element => {
        element.setAttribute('href', whatsappUrl);
        element.setAttribute('target', '_blank');
        element.setAttribute('rel', 'noopener noreferrer');
    });

    // Navegación suave mejorada
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Actualizar navegación activa
                    document.querySelectorAll('.nav a').forEach(link => {
                        link.classList.remove('active');
                    });
                    this.classList.add('active');
                }
            }
        });
    });

    // Observer para animaciones de entrada
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos para animación
    document.querySelectorAll('.value-card, .dish-card, .process-step, .testimonial-card').forEach(el => {
        observer.observe(el);
    });

    // Contador animado para stats del hero
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

    // Iniciar contadores cuando sean visibles
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stats = entry.target.querySelectorAll('.stat-number');
                if (stats.length >= 3) {
                    animateCounter(stats[0], 10000, '+');
                    animateCounter(stats[1], 98, '%');
                    animateCounter(stats[2], 100, '%');
                }
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }

    // Efecto de parallax suave en hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-background');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Header scroll effect
    let lastScrollY = window.scrollY;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(10, 35, 66, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(10, 35, 66, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }

        lastScrollY = window.scrollY;
    });

    // Preload de imágenes críticas
    function preloadImages() {
        const images = [
            'img/restaurante.jpg',
            'img/ceviche.png',
            'img/logo.jpg'
        ];
        
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    preloadImages();

    // Manejo de errores de imágenes
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Image failed to load:', this.src);
        });
    });

    console.log('Cevichería El Pueblo - Sitio premium cargado correctamente');
});

// Función global para ordenar items
function orderItem(itemName) {
    const message = `¡Hola! Quiero ordenar: ${itemName}`;
    const url = `https://wa.me/50663199969?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Función para reservar mesa
function reserveTable(people = 2, date = '') {
    const baseMessage = `¡Hola! Quiero reservar una mesa para ${people} personas`;
    const fullMessage = date ? `${baseMessage} para el ${date}` : baseMessage;
    const url = `https://wa.me/50663199969?text=${encodeURIComponent(fullMessage)}`;
    window.open(url, '_blank');
}