var $ = require("jquery");
var traceroute = require('traceroute');
var ip2loc = require("ip2location-nodejs");
var L = require("leaflet");
var MarkerCluster = require("leaflet.markercluster");
var notie = require("notie");
var getIP = require("external-ip")();

var routePath;

function vtrInit(){
    //initiate map
    initMap();
}

vtrInit();

function traceRoute() {
    $hostmane = $(".vtr-search-input>.vtr-search-input__input").val();
    if($hostmane){
        console.log($hostmane);
        getTraceRouteData($hostmane);
        //remove last path
        mainMap.removeLayer(routePath);
        
    }else{
        notie.alert({ type: "warning", text: 'We need an host first!' });
    }
}

$(".vtr-search-input>.vtr-search-input__button").on("click", function(){
    traceRoute();
});

$(".vtr-search-input>.vtr-search-input__input").keyup(function(e){
    if(e.keyCode == 13)
    {
        traceRoute();
    }
});

function drawHops($hopsArray, $placement) {
    if($placement === "map"){ //draw Hops on the map
        console.log("draw hops in map");
        for (var key in $hopsArray) {
            for (var hop in $hopsArray[key]) {
                console.log(hop); //hop host

                //make hop times string
                var times = "";
                for(var time in $hopsArray[key][hop]){
                    if(!isNaN($hopsArray[key][hop][time])){
                        times += "<li>"+$hopsArray[key][hop][time]+"ms</li>";
                    }
                }

                var hopData = {
                    key: key,
                    timesString: times
                }
                drawMarker(hop, null, hopData); // get host data from ip2 location + add marker to map
            }
        }

        //add path to map
        routePath = new L.Polyline(pathLocation, {
            color: '#2980b9', //belize-hole
            weight: 8,
            opacity: 1,
            smoothFactor: 1
        });

        routePath.addTo(mainMap);

    }else if($placement === "panel"){ //draw hops on results panel
        console.log("draw hops in panel");
        //remove loading state in results panel content
        $("#vtr-results-panel .vtr-results-panel__search-image").remove(); //loader image
        $("#vtr-results-panel p").remove(); // loader paragraph
        for (var key in $hopsArray) {
            for (var hop in $hopsArray[key]) {

                //get country short to use in flag

                var countryFlag = getHostData(hop, "country_short"); // get host data from ip2 location / add marker to map

                //make hop times string
                var times = "";
                for(var time in $hopsArray[key][hop]){
                    if(!isNaN($hopsArray[key][hop][time])){
                        times += "<li>"+$hopsArray[key][hop][time]+"ms</li>";
                    }
                }

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
