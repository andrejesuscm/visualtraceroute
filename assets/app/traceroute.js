/**
 * Used to traceroute and host
 * @param host : (String) hostname / IP
 */
function getTraceRouteData(host) {

    //Disable host input / trace button
    $(".vtr-search-input>.vtr-search-input__input").prop('disabled', true); // set search input disabled
    $(".vtr-search-input>.vtr-search-input__button").prop('disabled', true); // set search buton disabled
    
    //add loading state to header
    $(".vtr-header").addClass("vtr-is-loading");

    //clear last results panel data
    $("#vtr-results-panel").html("");
    
    //add loading message to results panel
    $("#vtr-results-panel").append("\
        <img class='vtr-results-panel__search-image' src='assets/images/loaders/loader.svg'>\
        <p class='vtr-results-panel__loading-text'>Tracing route.</p>\
    ");

    //add loading state to results panel
    $("#vtr-results-panel").addClass("vtr-is-loading");

    //add initial marker from current external ip Location AND start tracing after
    var localIP; //Local ip variable
    getIP((err, ip) => {
        //IF every service in the list has failed
        if (err) {
            notie.alert({ type: 'error', text: err }); //ad notie alert with returned error
        }
        
        localIP = ip;

        //draw initial marker
        drawMarker(localIP, "initial");
        
        //start tracing host
        traceroute.trace(host, function (err,hops) {        
            
            //IF ther is no errors tracing, clear all loading states and add hops to map and results panel 
            if(!err){
                //remove loading states / reenable host input and trace button
                $(".vtr-header").removeClass("vtr-is-loading");
                $(".vtr-search-input>.vtr-search-input__input").prop('disabled', false); // set search input back to enabled
                $(".vtr-search-input>.vtr-search-input__button").prop('disabled', false); // set search button back to enabled
        
                //remove loading state from results panel
                $("#vtr-results-panel").removeClass("vtr-is-loading");

                //add results to map and results panel
                drawHops(hops, "map");
                drawHops(hops, "panel");
            }else{ // send alert on error
                notie.alert({ type: 'error', text: err });
            }
        });
    });
}
