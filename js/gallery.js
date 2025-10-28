// Galería de imágenes dinámica
$(document).ready(async function() {
    const galleryGrid = $('#galleryGrid');
    
    if (galleryGrid.length === 0) return;

    try {
        const response = await fetch('/json/galeria.json');
        if (!response.ok) throw new Error('Error cargando galería');
        
        const galleryItems = await response.json();
        renderGallery(galleryItems);

        // Filtro de categorías para galería
        $('#galleryFilter').on('change', function() {
            const category = $(this).val();
            if (category === 'all') {
                renderGallery(galleryItems);
            } else {
                const filtered = galleryItems.filter(item => item.category === category);
                renderGallery(filtered);
            }
        });

    } catch (error) {
        console.error('Error:', error);
        galleryGrid.html('<div class="col-12 text-center"><p>Error cargando la galería</p></div>');
    }

    function renderGallery(items) {
        galleryGrid.empty();
        
        items.forEach(item => {
            const col = $('<div>').addClass('col-md-4 col-sm-6 mb-4');
            const card = $('<div>').addClass('card h-100 shadow-sm');
            const img = $('<img>').addClass('card-img-top thumb gallery-img')
                .attr({
                    src: item.image,
                    alt: item.alt || item.title,
                    loading: 'lazy'
                })
                .css('height', '250px');
            
            const cardBody = $('<div>').addClass('card-body');
            const title = $('<h5>').addClass('card-title').text(item.title);
            const desc = $('<p>').addClass('card-text text-muted small').text(item.description || '');

            cardBody.append(title, desc);
            card.append(img, cardBody);
            col.append(card);
            galleryGrid.append(col);
        });
    }
});