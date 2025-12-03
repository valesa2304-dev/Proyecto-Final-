// js/gallery.js
$(document).ready(async function () {
    const $galleryGrid = $('#galleryGrid');
    const $galleryFilter = $('#galleryFilter');

    // Si la página no tiene grid, no hacemos nada
    if ($galleryGrid.length === 0) return;

    let galleryItems = [];

    try {
        // Cargar el JSON de la carpeta /json
        const response = await fetch('./json/galeria.json');
        if (!response.ok) throw new Error('Error cargando galería');

        galleryItems = await response.json();

        // Mostrar todo al inicio
        renderGallery(galleryItems);

        // Filtro por categoría
        $galleryFilter.on('change', function () {
            const category = $(this).val();

            if (category === 'todos') {
                renderGallery(galleryItems);
            } else {
                const filtered = galleryItems.filter(
                    item => item.category === category
                );
                renderGallery(filtered);
            }
        });
    } catch (error) {
        console.error('Error:', error);
        $galleryGrid.html(
            '<div class="col-12 text-center text-muted">No se pudo cargar la galería.</div>'
        );
    }

    // ===== DIBUJAR LAS TARJETAS =====
    function renderGallery(items) {
        $galleryGrid.empty();

        if (!items || items.length === 0) {
            $galleryGrid.html(
                '<div class="col-12 text-center text-muted">No hay elementos para mostrar.</div>'
            );
            return;
        }

        items.forEach(item => {
            const $col = $('<div>').addClass('gallery-item-col');

            const $card = $('<div>').addClass('card gallery-card');

            const $img = $('<img>')
                .addClass('card-img-top gallery-img')
                .attr({
                    src: item.image,
                    alt: item.alt || item.title || 'Imagen de galería',
                    loading: 'lazy'
                });

            const $body = $('<div>').addClass('card-body');
            const $title = $('<h5>').addClass('card-title').text(item.title);
            const $desc = $('<p>')
                .addClass('card-text text-muted small')
                .text(item.description || '');

            $body.append($title, $desc);
            $card.append($img, $body);
            $col.append($card);
            $galleryGrid.append($col);
        });
    }
});
