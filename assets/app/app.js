var $ = require("jquery");
var traceroute = require('traceroute');
var ip2loc = require("ip2location-nodejs");
var L = require("leaflet");



var hosts = getTraceRouteData('google.com');



console.log(hosts);

