let map, directionsService, directionsRenderer;
const cevicheriaLocation = { lat: 9.935, lng: -84.09 };

function initMap() {
    // Verificar que el contenedor del mapa existe
    const mapContainer = document.getElementById('map');
    if (!mapContainer) {
        console.error('Elemento del mapa no encontrado');
        return;
    }

    // Inicializar servicios de Google Maps
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    
    // Configurar mapa
    map = new google.maps.Map(mapContainer, {
        center: cevicheriaLocation,
        zoom: 14,
        styles: [
            {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'on' }]
            }
        ]
    });

    directionsRenderer.setMap(map);

    // Marcador de la cevichería
    new google.maps.Marker({
        position: cevicheriaLocation,
        map: map,
        title: 'Cevichería El Pueblo',
        animation: google.maps.Animation.DROP
    });

    // Obtener ubicación del usuario y trazar ruta
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                calculateRoute(userLocation, cevicheriaLocation);
            },
            function(error) {
                console.warn('No se pudo obtener la ubicación del usuario:', error.message);
                // Centrar mapa solo en la cevichería si no se puede obtener ubicación
                map.setCenter(cevicheriaLocation);
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 60000
            }
        );
    }
}

function calculateRoute(origin, destination) {
    directionsService.route({
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true
    })
    .then(function(response) {
        directionsRenderer.setDirections(response);
        
        // Ajustar zoom para mostrar toda la ruta
        const bounds = new google.maps.LatLngBounds();
        response.routes[0].legs[0].steps.forEach(function(step) {
            bounds.extend(step.start_location);
            bounds.extend(step.end_location);
        });
        map.fitBounds(bounds);
    })
    .catch(function(error) {
        console.error('Error al calcular la ruta:', error);
    });
}

// Hacer la función global para Google Maps
window.initMap = initMap;