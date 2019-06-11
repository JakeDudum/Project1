//reminder: firebase 


var map, infoWindow;
var pos = {}; 
var open, rating, image, comment; 
function initMap() {
  
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            console.log(position);
            console.log(pos.lat);
            console.log(pos.lng);

            map = new google.maps.Map(document.getElementById ("map"), {
                center: { lat: pos.lat, lng: pos.lng},
                zoom: 15
            });

//marker for current location
            var marker = new google.maps.Marker({
                position: pos,
                map: map,
                title: "You are here.", 
                icon: "http://maps.google.com/mapfiles/ms/icons/purple-dot.png"
            })
//incorporate the google results for public restrooms
//add herokuapp link blocked by CORS 
            var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=Public+Resroom&location=" + pos.lat + "," + pos.lng + "&key=AIzaSyBDpFonM0-HhfZ_QmeXBNWkYDHsSL2sxV8";
            console.log(queryURL);

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                console.log(response);

                var results = response.results;
                console.log(results);

                for (var i = 0; i < results.length; i++) {
                    var locationPos = {
                        lat: results[i].geometry.location.lat,
                        lng: results[i].geometry.location.lng
                    };
                    console.log(locationPos);
                }
            })
        })
    }
}