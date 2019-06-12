//reminder: firebase 

var photoRef;

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
            // console.log(position);
            // console.log(pos.lat);
            // console.log(pos.lng);

            map = new google.maps.Map(document.getElementById("map"), {
                center: { lat: pos.lat, lng: pos.lng },
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
            //console.log(queryURL);

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);

                //console.log(results);

                for (var i = 0; i < response.results.length; i++) {
                    //console.log('response.results.length  '+response.results.length); 

                    var locationPos = {
                        lat: response.results[i].geometry.location.lat,
                        lng: response.results[i].geometry.location.lng
                    };

                    //console.log(locationPos);
                    if (response.results[i].photos === undefined) {

                    } else {
                        //photo reference ID
                        photoRef = response.results[i].photos[0]["photo_reference"];
                        console.log("photo: " + photoRef);
                        console.log(response.results[i].photos[0]["photo_reference"]);

                        var photoURL = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + photoRef + "&key=AIzaSyBDpFonM0-HhfZ_QmeXBNWkYDHsSL2sxV8"


                        $("#result").append(
                            "<br>" + response.results[i].name + "</br>" +
                            "<p>" + response.results[i].formatted_address + "</p>" +
                            "<p> Rating: " + response.results[i].rating + "</p>"  
                            + "<p> photo: <img src='" + photoURL + "'/> </p>"                          
                        );
                    


                    }

                }

            });


        })
    }
}