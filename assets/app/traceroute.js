function getTraceRouteData(host) {

    console.log(host);

    //$("#hostName").html(host);
    $(".vtr-search-input>.vtr-search-input__input").prop('disabled', true); // set search input disabled
    $(".vtr-search-input>.vtr-search-input__button").prop('disabled', true); // set search buton disabled
    
    console.log("tracing start");
    //add loading state
    $(".vtr-header").addClass("vtr-is-loading");

    //clear last data
    console.log("clear");
    $("#vtr-results-panel").html(""); //results panel
    console.log("add message");
    //add loading message
    $("#vtr-results-panel").append("\
        <img class='vtr-results-panel__search-image' src='assets/images/loaders/loader.svg'>\
        <p class='vtr-results-panel__loading-text'>Tracing route.</p>\
    ");

    $("#vtr-results-panel").addClass("vtr-is-loading");
    //adde initial marker
    var localIP;
    getIP((err, ip) => {
        if (err) {
            // every service in the list has failed
            notie.alert({ type: 'error', text: err });
        }
        localIP = ip;
        console.log(ip);
        drawMarker(localIP, "initial");
    });
    
    
    traceroute.trace(host, function (err,hops) {        
        var hostsList = [];
        
        
        if(!err){
            /*for (var key in hops) {
                for (var hop in hops[key]) {
                    //hostsList.push(hop); // add hop to hosts list array
                    console.log("*");
                    //console.log(hop); //hop host
                    //console.log(hops[key][hop]); //hops time array
                    //getHostData(hop); // get host data from ip2 location / add marker to map
                }
                console.log("##");
            }
            $hostsData = getHostsData(hostsList);*/
            //drawHops(hostsList);
            drawHops(hops, "map");
            drawHops(hops, "panel");
            //console.log(hostsList);
        }else{
            notie.alert({ type: 'error', text: err });


            console.log(err);
        }
        
        //remove loading state
        $(".vtr-header").removeClass("vtr-is-loading");
        $(".vtr-search-input>.vtr-search-input__input").prop('disabled', false); // set search input back to enabled
        $(".vtr-search-input>.vtr-search-input__button").prop('disabled', false); // set search button back to enabled

        //remove loading state from results panel
        $("#vtr-results-panel").removeClass("vtr-is-loading");
    });
}

function getRouteArray() {

}