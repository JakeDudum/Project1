var map, infoWindow;
var pos = {};

function initMap() {
    if(navigator.geolocation.getCurrentPosition(function (position) {
        pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
    })
}