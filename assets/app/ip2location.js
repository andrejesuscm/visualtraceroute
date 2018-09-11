ip2loc.IP2Location_init("./assets/db/IP2LOCATION-LITE-DB5.BIN");


function getHostData(ip) {
    var testip = [ip];
    for (var x = 0; x < testip.length; x++) {
        result = ip2loc.IP2Location_get_all(testip[x]);
        for (var key in result) {
            //console.log(key + ": " + result[key]);
        }
        console.log(result.latitude+", "+result.longitude);
        if(result.latitude != 0 && result.longitude != 0) {
            drawMarker(result.latitude, result.longitude);
        }
        return result;
    }
    mainMap.fitBounds(markers.getBounds().pad(0.5)); //zoom to fit all result + padding

}