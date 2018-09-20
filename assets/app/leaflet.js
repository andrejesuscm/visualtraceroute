var mainMap, markersLayer, markers = [], pathLocation = [];

function initMap(){
    markersLayer = new MarkerCluster.MarkerClusterGroup({ //create markersLayer cluster
        iconCreateFunction: function(cluster) {
            return L.divIcon({
                html: "<div class='vtr-map__marker-cluster'>"+cluster.getChildCount()+"</div>", //html for the marker cluster icon
                iconAnchor:   [24, 24],
                iconSize:   [48, 48]
            });
        },
        spiderfyDistanceMultiplier: 2,
        showCoverageOnHover: false
    }); 
    mainMap = L.map('mainMap').setView([39.3599791, -9.3922809], 3);
    
    var openMapsLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYW5kcmVqZXN1cyIsImEiOiJjajM0bTVrNHQwMXNyMzJxNmJ4N3Y0eXJsIn0.VhyneGbaY7fCC1xqcJGKDQ', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'your.mapbox.access.token'
    });
    
    mainMap.addLayer(openMapsLayer);
}


function drawMarker(hop, type, hopData) {
    switch(type){
        case "initial":
            console.log("draw initial marker: "+hop);

            //get local IP coordinates
            var localhostData = getHostData(hop);
            console.log(localhostData);

            if(markersLayer){ // clear marker cluster if already exist
	            markersLayer.clearLayers();
            }

            var initialMarker = L.divIcon({
                html: "<div class='vtr-map__initial-marker'></div>",
                iconSize: [24, 241],
                iconAnchor: [12, 12]
            });

            // create popup contents for initial marker
            var customInitialHostPopup = "<div class='vtr-map__popup__header'>\
                <div class='vtr-map__popup__header-hop-number'>#0</div>\
                <div class='vtr-map__popup__header-hop'>"+hop+"</div>\
                <div class='vtr-map__popup__header-country-flag' style='background-image: url(dist/images/country_flags/64/"+localhostData.country_short+"_64.png)'></div>\
            </div>\
            <ul class='vtr-map__popup__host-data'>\
                <li>\
                    <span class='vtr-map__popup__host-data-name'>Region:</span>\
                    <span class='vtr-map__popup__host-data-desc'>"+localhostData.region+"</span>\
                </li>\
                <li>\
                    <span class='vtr-map__popup__host-data-name'>City:</span>\
                    <span class='vtr-map__popup__host-data-desc'>"+localhostData.city+"</span>\
                </li>\
            </ul>\
            ";

             // specify popup options for initial marker
             var customInitialHostOptions = {
                'maxWidth': '500',
                'className' : 'vtr-map__popup'
            }
            
            var initialMarker = L.marker([localhostData.latitude, localhostData.longitude], {icon: initialMarker}).bindPopup(customInitialHostPopup,customInitialHostOptions);

            markersLayer.addLayer(initialMarker);

            mainMap.addLayer(markersLayer);

            //add localhost to results panel
            $("#vtr-results-panel").append(
                "<ul class='vtr-results-panel__list'>\
                    <li>\
                        <div class='vtr-results-panel__list__hop-number'>\
                            #0\
                        </div>\
                        <div class='vtr-results-panel__list__hop-info'>\
                            <div class='vtr-results-panel__list__hop-info__host'>\
                                "+hop+"\
                            </div>\
                        </div>\
                        <div class='vtr-results-panel__list__hop-country-flag' style='background-image: url(dist/images/country_flags/64/"+localhostData.country_short+"_64.png)'></div>\
                    </li>\
                </ul>"
            );

            //clear previous pathLocation Array
            pathLocation = [];

            //add point to paths array
            pathLocation.push(new L.LatLng(localhostData.latitude, localhostData.longitude));
            mainMap.fitBounds(markersLayer.getBounds().pad(0.5)); //zoom to fit all result + padding
            //getHostData(hop, "coordinates");
        break;
        default:
            console.log("draw marker");
            console.log(hop);
            //get coordinates
            coordinates = getHostData(hop, "coordinates");
            hostData = getHostData(hop);
            //make icon
            markers[hop.replace(".", "_")] = L.divIcon({
                html: "<div class='vtr-map__marker'></div>",
                iconSize: [24, 241],
                iconAnchor: [12, 12]
            });

            var countryFlag = getHostData(hop, "country_short"); // get host data from ip2 location / add marker to map

            // create popup contents
            var customPopup = "<div class='vtr-map__popup__header'>\
                <div class='vtr-map__popup__header-hop-number'>#"+hopData.key+"</div>\
                <div class='vtr-map__popup__header-hop'>"+hop+"</div>\
                <div class='vtr-map__popup__header-country-flag' style='background-image: url(dist/images/country_flags/64/"+countryFlag+"_64.png)'></div>\
            </div>\
            <ul class='vtr-map__popup__hop-times'>"+hopData.timesString+"</ul>\
            <ul class='vtr-map__popup__host-data'>\
                <li>\
                    <span class='vtr-map__popup__host-data-name'>Region:</span>\
                    <span class='vtr-map__popup__host-data-desc'>"+hostData.region+"</span>\
                </li>\
                <li>\
                    <span class='vtr-map__popup__host-data-name'>City:</span>\
                    <span class='vtr-map__popup__host-data-desc'>"+hostData.city+"</span>\
                </li>\
            </ul>\
            ";
    
            // specify popup options 
            var customOptions = {
                'maxWidth': '500',
                'className' : 'vtr-map__popup'
            }
    

            markers[hop.replace(".", "_")] = L.marker([coordinates.latitude, coordinates.longitude], {icon: markers[hop.replace(".", "_")]}).bindPopup(customPopup,customOptions);
            
            //add to layer
            markersLayer.addLayer(markers[hop.replace(".", "_")]);

            //add point to paths array
            pathLocation.push(new L.LatLng(coordinates.latitude, coordinates.longitude));

            //fitbounds
            mainMap.fitBounds(markersLayer.getBounds().pad(0.2)); //zoom to fit all result + padding
    }
/*
    var myIcon = L.icon({
        iconUrl: 'assets/images/marker.png',
        iconSize: [51, 51],
        iconAnchor: [25, 0],
        popupAnchor: [25, -45],
        shadowUrl: '',
        shadowSize: [68, 95],
        shadowAnchor: [22, 94]
    });

    L.marker([latitude, longitude], {icon: myIcon}).addTo(mainMap);*/
}

//drawMarker(39.3599791, -9.3922809);
