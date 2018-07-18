
function getTraceRouteData(host) {

    $("#hostName").html(host);

    console.log("tracing start");


    traceroute.trace(host, function (err,hops) {
        var hostsList = [];
        
        if(!err){
            for (var key in hops) {
                //console.log(key + ": " + result[key]);
                //console.log(hops[key]);
                
                for (var hop in hops[key]) {
                    
                    //console.log(hop);
                    
                    hostsList.push(hop);

                    getHostData(hop);
                }
            }
            //console.log(hops);
            console.log(hostsList);
            //return hops;

            //$("#hostsList").append(hostsList);
            //return hostsList;
        }else{
            console.log(err);
        }
    });
}

function getRouteArray() {

}