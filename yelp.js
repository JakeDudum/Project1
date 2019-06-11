var map, infoWindow;
var pos = {};

function initMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }

            map = new google.maps.Map(document.getElementById('map'), {
                center: {
                    lat: pos.lat,
                    lng: pos.lng
                },
                zoom: 15
            });

            var marker = new google.maps.Marker({
                position: pos,
                map: map,
                title: "You are here.",
                icon: "http://maps.google.com/mapfiles/ms/icons/purple-dot.png"
            })
            marker.setMap(map);
            var queryURL = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=' + pos.lat + '&longitude=' + pos.lng + '&term=public+restroom&reviews&radius=10000&limit=15&attributes=gender_neutral_restrooms';
            console.log(pos.lat);
            console.log(pos.lng);
            $.ajax({
                url: queryURL,
                method: "GET",
                headers: {
                    authorization: "Bearer 4Rm7FqyoBh0DGVD6bV936T1y38wYSXyOiQBtQsIza6j_MZVWcPuLtT7x_06Ej7j5TN4ZFgsOAxlj_FHlQrjgyfYbXsGuYjQeamj84ii533Ii5sTH4wKUUjhqNqf6XHYx"
                }
            }).then(function (response) {
                console.log(response);
                for (var i = 0; i < response.businesses.length; i++) {
                    var yelpPos = {
                        lat: response.businesses[i].coordinates.latitude,
                        lng: response.businesses[i].coordinates.longitude
                    };
                    var marker = new google.maps.Marker({
                        position: yelpPos,
                        map: map,
                        title: response.businesses[i].alias,
                        icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                    });
                    marker.setMap(map);
                    var newDiv = $("<div>");
                    var name = "<br>" + response.businesses[i].name + "<br>";
                    var id = response.businesses[i].id;
                    var imageDiv = $("<img>");
                    imageDiv.attr('src', response.businesses[i].image_url);
                    imageDiv.css({'width': 200, 'height': 200});
                    var isOpen;
                    if (response.businesses[i].is_closed === true) {
                        isOpen = "<br> Open!";
                    }
                    else {
                        isOpen = "<br> Closed!";
                    }
                    newDiv.attr("yelp-" + i, id);
                    newDiv.append(name);
                    newDiv.append(imageDiv);
                    newDiv.append(isOpen);
                    $("#results").append(newDiv);

                }
            })
        })
    }
}

// function mapIt(position) {
//     pos = {
//         lat: position.coords.latitude,
//         lng: position.coords.longitude
//     };

//     map = new google.maps.Map($("#map"), {
//         center: {
//             lat: pos.lat,
//             lng: pos.lng
//         },
//         zoom: 15
//     });
// };