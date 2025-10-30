
$(document).ready(async function() {
    try {
       
        const response = await fetch('./json/menu.json');
        if (!response.ok) throw new Error('Error cargando menú');
        
        const items = await response.json();
        displayFeaturedItems(items);
        
    } catch (error) {
        console.error('Error:', error);
        $('#featuredMenu').html('<div class="col-12 text-center"><p class="text-muted">Error cargando los items destacados.</p></div>');
    }

    function displayFeaturedItems(menuItems) {
        const featuredGrid = $('#featuredMenu');
        const featuredItems = menuItems.filter(item => item.tag).slice(0, 3);
        
        if (featuredItems.length === 0) {
            featuredGrid.html('<div class="col-12 text-center"><p class="text-muted">No hay items destacados disponibles.</p></div>');
            return;
        }

        featuredItems.forEach(item => {
            const col = $('<div>').addClass('col-md-4 mb-4');
            const card = $('<div>').addClass('card h-100 shadow-sm menu-card');
            
            const img = $('<img>').addClass('card-img-top')
                .attr({
                    src: item.image,
                    alt: item.alt || item.name,
                    loading: 'lazy'
                })
                .css({
                    'height': '200px',
                    'object-fit': 'cover'
                });
            
            const cardBody = $('<div>').addClass('card-body d-flex flex-column');
            const title = $('<h3>').addClass('h5 card-title').text(item.name);
            const desc = $('<p>').addClass('card-text text-muted small flex-grow-1').text(item.desc);
            
            const priceRow = $('<div>').addClass('d-flex align-items-center justify-content-between mt-auto');
            const price = $('<span>').addClass('price fw-bold text-coral').text(`₡${item.price.toLocaleString('es-CR')}`);
            const badge = $('<span>').addClass('badge bg-warning text-dark').text(item.tag);
            
            priceRow.append(price, badge);
            cardBody.append(title, desc, priceRow);
            card.append(img, cardBody);
            col.append(card);
            featuredGrid.append(col);
        });
    }
});