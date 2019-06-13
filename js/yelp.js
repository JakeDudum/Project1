var map, infoWindow;
var pos = {};

function initMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }

            map = new google.maps.Map(document.getElementById("map"), {
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
                    newDiv.addClass('results-div')
                    var newButton = $("<button>");
                    newButton.addClass("btn-small waves-effect waves-light orange reviews")
                    var name = $("<p>").text(response.businesses[i].name);
                    name.addClass("business");
                    var id = response.businesses[i].id;
                    var imageDiv = $("<img>");
                    imageDiv.attr('src', response.businesses[i].image_url);
                    imageDiv.css({ 'width': 200, 'height': 200, float: "left" });
                    var isOpen;
                    if (response.businesses[i].is_closed === false) {
                        isOpen = $("<p>").text("Open!");
                    }
                    else {
                        isOpen = $("<p>").text("Closed!");
                    }
                    newTextDiv = $("<div>");
                    newTextDiv.attr("id", id);
                    newButton.attr("data-id", id);
                    newButton.css({ float: "left" });
                    newButton.addClass('places');
                    newButton.text("Reviews");
                    newDiv.append(name);
                    newDiv.append(imageDiv);
                    newDiv.append(isOpen);
                    newDiv.append(newButton);
                    newDiv.append(newTextDiv);
                    $("#results").append(newDiv);
                }
            })
        })
    }
}

function initMapOnSubmit(address, city, state) {
    // pos = {
    //     lat: position.coords.latitude,
    //     lng: position.coords.longitude
    // }

    var locationPos = {};

    $.ajax({
        url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + ",+" + city + ",+" + state + "&key=AIzaSyBDpFonM0-HhfZ_QmeXBNWkYDHsSL2sxV8",
        method: "GET"
    }).then(function (response) {
        console.log(response);
        locationPos = {
            lat: response.results[0].geometry.location.lat,
            lng: response.results[0].geometry.location.lng
        }
        map = new google.maps.Map(document.getElementById("map"), {
            center: {
                lat: locationPos.lat,
                lng: locationPos.lng
            },
            zoom: 15
        });
    
        var marker = new google.maps.Marker({
            position: locationPos,
            map: map,
            title: "You are here.",
            icon: "http://maps.google.com/mapfiles/ms/icons/purple-dot.png"
        })
        marker.setMap(map);
    })
    
    var queryURL = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=public+restroom&location=' + address + ' ' + city + ' ' + state + '&radius=5000&limit=15&attributes=gender_neutral_restrooms';
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
            newDiv.addClass('results-div')
            var newButton = $("<button>");
            newButton.addClass("btn-small waves-effect waves-light orange reviews")
            var name = $("<p>").text(response.businesses[i].name);
            name.addClass("business");
            var id = response.businesses[i].id;
            var imageDiv = $("<img>");
            imageDiv.attr('src', response.businesses[i].image_url);
            imageDiv.css({ 'width': 200, 'height': 200, float: "left" });
            var isOpen;
            if (response.businesses[i].is_closed === false) {
                isOpen = $("<p>").text("Open!");
            }
            else {
                isOpen = $("<p>").text("Closed!");
            }
            newTextDiv = $("<div>");
            newTextDiv.attr("id", id);
            newButton.attr("data-id", id);
            newButton.css({ float: "left" });
            newButton.addClass('places');
            newButton.text("Reviews");
            newDiv.append(name);
            newDiv.append(imageDiv);
            newDiv.append(isOpen);
            newDiv.append(newButton);
            newDiv.append(newTextDiv);
            $("#results").append(newDiv);
        }
    })
}

$(document).on("click", ".places", function () {
    console.log(this);
    var placeID = $(this).attr("data-id");
    var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" + placeID + "/reviews";
    $.ajax({
        url: queryURL,
        method: "GET",
        headers: {
            authorization: "Bearer 4Rm7FqyoBh0DGVD6bV936T1y38wYSXyOiQBtQsIza6j_MZVWcPuLtT7x_06Ej7j5TN4ZFgsOAxlj_FHlQrjgyfYbXsGuYjQeamj84ii533Ii5sTH4wKUUjhqNqf6XHYx"
        }
    }).then(function (response) {
        console.log(response);
        for (var i = 0; i < response.reviews.length; i++) {
            $("#" + placeID).append($("<p>").text(response.reviews[i].text), "<br>");
        }
    })
})

$("#submit").on("click", function () {
    event.preventDefault();
    $("#results").empty();
    var address = $("#address").val();
    var city = $("#city").val();
    var state = $("#state").val();

    initMapOnSubmit(address, city, state);

    $("#address").val("");
    $("#city").val("");
    $("#state").val("");

})
