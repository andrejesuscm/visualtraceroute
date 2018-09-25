var $ = require("jquery"); //Jquery Library
var traceroute = require('traceroute'); //Wrapper into native traceroute
var ip2loc = require("ip2location-nodejs"); //IP2location nodejs API
var L = require("leaflet"); //Leaflet library | maps UI
var MarkerCluster = require("leaflet.markercluster"); //Leaflet plugin form marker clustering
var notie = require("notie"); //Notie Library | alerts
var getIP = require("external-ip")(); // package to get external IP address


var routePath = []; //array to store the traceroute path

initMap(); //initiate map | from leaflet.js

/**
 * Used to start tracing the route from an host
 */
function traceRoute() {
    //get hostname value from input
    $hostname = $(".vtr-search-input>.vtr-search-input__input").val();

    if($hostname){ //trace it if available
        //remove last path
        mainMap.removeLayer(routePath);

        //start tracing from traceroute.js
        getTraceRouteData($hostname);
        
    }else{ //send alert if host is empty
        notie.alert({ type: "warning", text: 'We need an host first!' });
    }
}
/**
 * Event Listeners
 */

//trace button click
$(".vtr-search-input>.vtr-search-input__button").on("click", function(){
    //start tracing
    traceRoute();
});

//search input ENTER keyup
$(".vtr-search-input>.vtr-search-input__input").keyup(function(e){
    if(e.keyCode == 13)
    {
        //start tracing
        traceRoute();
    }
});

/**
 * Function used to draw hops / results in results panel from traced hopsArray
 * @param $hopsArray : hops array object
 * @param $placement : (String) result placement (map, panel)
 */
function drawHops($hopsArray, $placement) {
    if($placement === "map"){ //draw Hops on the map
        for (var key in $hopsArray) {
            for (var hop in $hopsArray[key]) {
                //make hop times string
                var times = "";
                for(var time in $hopsArray[key][hop]){
                    if(!isNaN($hopsArray[key][hop][time])){
                        times += "<li>"+$hopsArray[key][hop][time]+"ms</li>";
                    }
                }

                //create hopData with hop response times
                var hopData = {
                    key: key,
                    timesString: times
                }

                // draw marker into the map
                drawMarker(hop, null, hopData);
            }
        }

        //create a path instance with the generated path from markers to the map
        routePath = new L.Polyline(pathLocation, {
            color: '#2980b9', //belize-hole
            weight: 8,
            opacity: 1,
            smoothFactor: 1
        });

        //add route path instace to the map
        routePath.addTo(mainMap);

    }else if($placement === "panel"){ //draw hops on results panel
        //remove loading state in results panel content
        $("#vtr-results-panel .vtr-results-panel__search-image").remove(); //loader image
        $("#vtr-results-panel p").remove(); // loader paragraph

        //loop trough the hops array and add them to the results panel
        for (var key in $hopsArray) {
            for (var hop in $hopsArray[key]) {
                
                //get country short from ip2 location / add marker to map to use in flag
                var countryFlag = getHostData(hop, "country_short");

                //make hop times list
                var times = "";
                for(var time in $hopsArray[key][hop]){
                    if(!isNaN($hopsArray[key][hop][time])){
                        times += "<li>"+$hopsArray[key][hop][time]+"ms</li>";
                    }
                }

                //append to the map the result
                $("#vtr-results-panel .vtr-results-panel__list").append(
                    "<li>\
                        <div class='vtr-results-panel__list__hop-number'>\
                            #"+key+"\
                        </div>\
                        <div class='vtr-results-panel__list__hop-info'>\
                            <div class='vtr-results-panel__list__hop-info__host'>\
                                "+hop+"\
                            </div>\
                            <ul class='vtr-results-panel__list__hop-info__time'>\
                                "+times+"\
                            </ul>\
                        </div>\
                        <div class='vtr-results-panel__list__hop-country-flag' style='background-image: url(dist/images/country_flags/64/"+countryFlag+"_64.png)'></div>\
                    </li>"
                );
            }
        }
    }
}
