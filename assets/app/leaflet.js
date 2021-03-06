var mainMap,
    markersLayer,
    markers = [],
    pathLocation = [];

/**
 * Create a map instance, add the marker clustering, and open maps layers
 */
function initMap(){
    //create markersLayer cluster
    markersLayer = new MarkerCluster.MarkerClusterGroup({ 
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

    //create openmaps layer
    var openMapsLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYW5kcmVqZXN1cyIsImEiOiJjajM0bTVrNHQwMXNyMzJxNmJ4N3Y0eXJsIn0.VhyneGbaY7fCC1xqcJGKDQ', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'your.mapbox.access.token'
    });

    //create map instance
    mainMap = L.map('mainMap').setView([39.3599791, -9.3922809], 3);
    
    //add openmaps layer to map instance
    mainMap.addLayer(openMapsLayer);
}

/**
 * Marker drawing function. used to add markers to the markers clustering layer
 * @param hop (String) : hop ip address
 * @param type (String) : Type of marker (initial | default )
 */
function drawMarker(hop, type, hopData) {
    switch(type){
        case "initial": 
            //get local IP coordinates from IP2Location DB
            var localhostData = getHostData(hop);

            // clear marker cluster if already exist
            if(markersLayer){
	            markersLayer.clearLayers();
            }

            //create initial marker element
            var initialMarker = L.divIcon({
                html: "<div class='vtr-map__initial-marker'></div>",
                iconSize: [24, 241],
                iconAnchor: [12, 12]
            });

            // create popup contents for initial marker
            var customInitialHostPopup = "<div class='vtr-map__popup__header'>\
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
            
            // create a marker instance and bind the popup elemtn to it
            var initialMarker = L.marker([localhostData.latitude, localhostData.longitude], {icon: initialMarker}).bindPopup(customInitialHostPopup,customInitialHostOptions);

            //add the initial marker to the markersLayer
            markersLayer.addLayer(initialMarker);

            //add markers layer to the map instance
            mainMap.addLayer(markersLayer);

            //zoom to fit all results + padding
            mainMap.fitBounds(markersLayer.getBounds().pad(0.5));

            //add localhost to results panel
            $("#vtr-results-panel").append(
                "<ul class='vtr-results-panel__list'>\
                    <li>\
                        <div class='vtr-results-panel__list__hop-number'>\
                            <small>Local</small>\
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
            break;
        default:
            //get IP coordinates from IP2Location DB
            coordinates = getHostData(hop, "coordinates");
            
            //get complete host data from IP2Location DB
            hostData = getHostData(hop);

            //create marker element
            markers[hop.replace(".", "_")] = L.divIcon({
                html: "<div class='vtr-map__marker'>#"+hopData.key+"</div>",
                iconSize: [24, 241],
                iconAnchor: [12, 12]
            });

            // get host country flag from from ip2 location DB
            var countryFlag = getHostData(hop, "country_short");

            // create popup element for marker
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
    
            // create a marker instance and bind the popup elemtn to it
            markers[hop.replace(".", "_")] = L.marker([coordinates.latitude, coordinates.longitude], {icon: markers[hop.replace(".", "_")]}).bindPopup(customPopup,customOptions);
            
            //add marker to markers layer
            markersLayer.addLayer(markers[hop.replace(".", "_")]);
            
            //zoom to fit all results + padding
            mainMap.fitBounds(markersLayer.getBounds().pad(0.2)); //zoom to fit all result + padding

            //add point to paths array
            pathLocation.push(new L.LatLng(coordinates.latitude, coordinates.longitude));
    }
}

