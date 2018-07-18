var mainMap = L.map('mainMap').setView([39.3599791, -9.3922809], 2);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYW5kcmVqZXN1cyIsImEiOiJjajM0bTVrNHQwMXNyMzJxNmJ4N3Y0eXJsIn0.VhyneGbaY7fCC1xqcJGKDQ', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'your.mapbox.access.token'
}).addTo(mainMap);

function drawMarker(latitude, longitude) {

    var myIcon = L.icon({
        iconUrl: 'assets/images/marker.png',
        iconSize: [51, 51],
        iconAnchor: [25, 0],
        popupAnchor: [25, -45],
        shadowUrl: '',
        shadowSize: [68, 95],
        shadowAnchor: [22, 94]
    });

    L.marker([latitude, longitude], {icon: myIcon}).addTo(mainMap);
}

drawMarker(39.3599791, -9.3922809);
