

document.addEventListener('DOMContentLoaded', async () => {
    // Contenedor donde irán los platos destacados
    const featuredGrid = document.getElementById('featuredMenu');
    if (!featuredGrid) return; // Si no existe, no hace nada

    try {
        // Cargar el archivo JSON del menú
        const response = await fetch('json/menu.json');
        if (!response.ok) {
            throw new Error('No se pudo cargar el archivo de menú');
        }

        // Convertir la respuesta a objeto JS
        const menuItems = await response.json();

        // Filtrar los platos marcados como destacados
        const destacados = menuItems
            .filter(item => item.destacado)
            .slice(0, 3); // Máximo 3

        // Si por algo no hay destacados, uso los primeros 3 del JSON
        const platos = destacados.length > 0
            ? destacados
            : menuItems.slice(0, 3);

        // Limpiar cualquier contenido estático previo
        featuredGrid.innerHTML = '';

        // Crea cada tarjeta de plato con el mismo diseño original
        platos.forEach(item => {
            // Contenedor principal de la tarjeta
            const itemDiv = document.createElement('div');
            itemDiv.className = 'menu-item';

            // Imagen del plato
            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.alt || item.name;
            itemDiv.appendChild(img);

            // Badge (etiqueta) si existe, por ejemplo: "Más Pedido"
            if (item.tag) {
                const badge = document.createElement('div');
                badge.className = 'menu-badge';
                badge.textContent = item.tag;
                itemDiv.appendChild(badge);
            }

            // Contenedor del texto
            const contentDiv = document.createElement('div');
            contentDiv.className = 'menu-content';

            // Nombre del plato
            const title = document.createElement('h4');
            title.textContent = item.name;

            // Descripción del plato
            const desc = document.createElement('p');
            desc.textContent = item.desc;

            // Precio formateado en colones
            const price = document.createElement('div');
            price.className = 'menu-price';
            price.textContent = '₡' + Number(item.price || 0).toLocaleString('es-CR');

            // Botón de ordenar 
            const button = document.createElement('button');
            button.className = 'btn btn-accent btn-small';
            button.innerHTML = '<i class="bi bi-cart-plus"></i>Ordenar Ahora';

            button.addEventListener('click', () => {
                if (typeof orderItem === 'function') {
                    orderItem(item.name);
                }
            });

            // Armar la tarjeta
            contentDiv.appendChild(title);
            contentDiv.appendChild(desc);
            contentDiv.appendChild(price);
            contentDiv.appendChild(button);

            itemDiv.appendChild(contentDiv);

            // Agregar la tarjeta al grid
            featuredGrid.appendChild(itemDiv);
        });
    } catch (error) {
        console.error(error);

        // Mensaje de respaldo si algo falla
        featuredGrid.innerHTML = `
            <p style="text-align:center; margin-top:1rem;">
                No se pudieron cargar los platos destacados.<br>
                <a href="menu.html">Ver menú completo</a>.
            </p>
        `;
    }
});
