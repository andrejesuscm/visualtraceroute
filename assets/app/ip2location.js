//init IP2Location API
ip2loc.IP2Location_init("./assets/db/IP2LOCATION-LITE-DB5.BIN");

/**
 * Wrapper function used to get data from IP2Location
 * @param ip : (String) IP address
 * @param type : (String) type of result (country_short, coordinates, default) 
 */
function getHostData(ip, type) {
    switch(type){
        case "country_short": //returns the country short code
            result = ip2loc.IP2Location_get_all(ip);
            return result.country_short;
        case "coordinates": //returns object with latitude and longitude
            result = ip2loc.IP2Location_get_all(ip);
            return {latitude: result.latitude, longitude: result.longitude};
        default: //returns the complete set of data
            result = ip2loc.IP2Location_get_all(ip);
            return result;
    }
}