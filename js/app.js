var firebaseConfig = {
    apiKey: "AIzaSyBWrFxW_77FLMcrt8WoixzkEPy6ClSu6f0",
    authDomain: "where2p-388bb.firebaseapp.com",
    databaseURL: "https://where2p-388bb.firebaseio.com",
    projectId: "where2p-388bb",
    storageBucket: "where2p-388bb.appspot.com",
    messagingSenderId: "896023113193",
    appId: "1:896023113193:web:5c255b734c84f410"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$(document).on('click', ".submit-user-review", function () {
    event.preventDefault();
    var reviewDiv = $("<div>");
    var userName = $('#user-name').val().trim();
    var userNameDiv = $("<p>").text(userName);
    var userReview = $('#user-review').val().trim();
    var userReviewDiv = $('<p>').text(userReview);

    reviewDiv.append(userNameDiv, userReviewDiv);

    if (userName.length > 0 && userReview.length > 0) {
        database.ref($(this).attr("data-id")).push({
            name: userName,
            review: userReview
        })
    }
});

$(document).on('click', ".submit-reviews", function () {
    event.preventDefault();
    var id = $(this).attr('data-id');
    $("#" + id).removeClass('hide');



    $(this).addClass('hide');
});


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
                animation: google.maps.Animation.DROP,
                icon: "http://maps.google.com/mapfiles/ms/icons/purple-dot.png"
            })
            marker.setMap(map);

            var apiKey = "e9d3c600773e0277e03e42289aeaf483";

            $.ajax({
                url: 'https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?lat=' + pos.lat + '&lon=' + pos.lng + '&units=imperial&appid=' + apiKey,
                method: "GET"

            }).then(function (response) {
                console.log(response);

                var weatherCityId = response.id;

                console.log(weatherCityId);
                $('#openweathermap-widget-15').empty();
                // newWeatherDiv.append(name + currentTemp);
                // $("#weather").append(newWeatherDiv);
                window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = []; window.myWidgetParam.push({ id: 15, cityid: weatherCityId, appid: '945c3adf4a846dc18d8b8ed754fe7142', units: 'imperial', containerid: 'openweathermap-widget-15', }); (function () { var script = document.createElement('script'); script.async = true; script.charset = "utf-8"; script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js"; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(script, s); })();
                // $("#openweathermap-widget-9").append(windowWidget);

            });

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
                        animation: google.maps.Animation.DROP,
                        icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                    });
                    marker.setMap(map);
                    var newDiv = $("<div>").addClass('row results-div');
                    var addReview = $("<button>").addClass("btn-small waves-effect waves-light orange reviews");
                    var name = $("<p>").text(response.businesses[i].name).addClass("business");
                    var id = response.businesses[i].id;
                    var imageDiv = $("<img>").attr('src', response.businesses[i].image_url);
                    imageDiv.addClass("col s4 placeImg");
                    var isOpen;
                    if (response.businesses[i].is_closed === false) {
                        isOpen = $("<p>").text("Open!");
                    }
                    else {
                        isOpen = $("<p>").text("Closed!");
                    }

                    var seeReview = $("<button>").addClass("btn-small waves-effect waves-light orange reviews");
                    seeReview.attr("data-id", id);
                    seeReview.css({ float: "left" });
                    seeReview.addClass('see-reviews');
                    seeReview.text("See Reviews");

                    addReview.attr("data-id", id);
                    addReview.css({ float: "left" });
                    addReview.addClass('submit-reviews');
                    addReview.text("Submit Review");
                    newDiv.append(name, imageDiv, isOpen, seeReview, addReview);

                    var inputField1 = $("<div>").addClass('input-field');
                    var inputField2 = $("<div>").addClass('input-field');
                    var form = $("<form>").addClass('col s8 submit-form');
                    form.attr('id', id);
                    var userNameInput = $('<input>').attr('id', 'userName');
                    userNameInput.attr('type', 'text');
                    userNameInput.addClass('row');
                    var userReviewInput = $('<textarea>').attr("id", 'userReview');
                    userReviewInput.addClass('row materialize-textarea');
                    var nameLabel = $('<label>').attr('for', 'username');
                    nameLabel.text("Name");
                    var reviewLabel = $('<label>').attr('for', 'userReview');
                    reviewLabel.text("Review");

                    inputField1.append(userNameInput, nameLabel);
                    inputField2.append(userReviewInput, reviewLabel);

                    form.append(inputField1, inputField2);
                    form.addClass('hide');

                    newDiv.append(form);
                    $("#results").append(newDiv);
                }
            })

            $.ajax({
                url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=Public+Resroom&location=" + pos.lat + "," + pos.lng + "&key=AIzaSyBDpFonM0-HhfZ_QmeXBNWkYDHsSL2sxV8",
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
                    var marker = new google.maps.Marker({
                        position: locationPos,
                        map: map,
                        title: response.results[i].formatted_address,
                        animation: google.maps.Animation.DROP,
                    });
                    marker.setMap(map);

                    //console.log(locationPos);
                    if (response.results[i].photos === undefined) {

                    } else {
                        //photo reference ID
                        photoRef = response.results[i].photos[0]["photo_reference"];
                        console.log("photo: " + photoRef);
                        console.log(response.results[i].photos[0]["photo_reference"]);

                        var photoURL = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + photoRef + "&key=AIzaSyBDpFonM0-HhfZ_QmeXBNWkYDHsSL2sxV8"


                        $("#results2").append(
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
            animation: google.maps.Animation.DROP,
            icon: "http://maps.google.com/mapfiles/ms/icons/purple-dot.png"
        })
        marker.setMap(map);

        var apiKey = "e9d3c600773e0277e03e42289aeaf483";
        $.ajax({
            url: 'https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?lat=' + locationPos.lat + '&lon=' + locationPos.lng + '&units=imperial&appid=' + apiKey,
            method: "GET"
    
        }).then(function (response) {
            console.log(response);
    
            var weatherCityId = response.id;
    
            console.log(weatherCityId);
            $('#openweathermap-widget-15').empty();
            // newWeatherDiv.append(name + currentTemp);
            // $("#weather").append(newWeatherDiv);
            window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = []; window.myWidgetParam.push({ id: 15, cityid: weatherCityId, appid: '945c3adf4a846dc18d8b8ed754fe7142', units: 'imperial', containerid: 'openweathermap-widget-15', }); (function () { var script = document.createElement('script'); script.async = true; script.charset = "utf-8"; script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js"; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(script, s); })();
            // $("#openweathermap-widget-9").append(windowWidget);
    
        });

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
                animation: google.maps.Animation.DROP,
                icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            });
            marker.setMap(map);
            var newDiv = $("<div>");
            newDiv.addClass('row results-div')
            var addReview = $("<button>");
            addReview.addClass("btn-small waves-effect waves-light orange reviews")
            var name = $("<p>").text(response.businesses[i].name);
            name.addClass("business");
            var id = response.businesses[i].id;
            var imageDiv = $("<img>").addClass("placeImg");
            imageDiv.attr('src', response.businesses[i].image_url);
            var isOpen;
            if (response.businesses[i].is_closed === false) {
                isOpen = $("<p>").text("Open!");
            }
            else {
                isOpen = $("<p>").text("Closed!");
            }
            var seeReview = $("<button>").addClass("btn-small waves-effect waves-light orange reviews");
            seeReview.attr("data-id", id);
            seeReview.css({ float: "left" });
            seeReview.addClass('see-reviews');
            seeReview.text("See Reviews");

            addReview.attr("data-id", id);
            addReview.css({ float: "left" });
            addReview.addClass('submit-reviews');
            addReview.text("Submit Review");
            newDiv.append(name, imageDiv, isOpen, addReview);

            var inputField1 = $("<div>").addClass('input-field');
            var inputField2 = $("<div>").addClass('input-field');
            var form = $("<form>").addClass('submit-form');
            form.attr('id', id);
            var userNameInput = $('<input>').attr('id', 'userName');
            userNameInput.attr('type', 'text');
            var userReviewInput = $('<textarea>').attr("id", 'userReview');
            userReviewInput.addClass('materialize-textarea');
            var nameLabel = $('<label>').attr('for', 'username');
            nameLabel.text("Name");
            var reviewLabel = $('<label>').attr('for', 'userReview');
            reviewLabel.text("Review");

            inputField1.append(userNameInput, nameLabel);
            inputField2.append(userReviewInput, reviewLabel);

            form.append(inputField1, inputField2);
            form.addClass('hide');

            newDiv.append(form);
            $("#results").append(newDiv);
        }
    });

        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=Public+Restroom&location=" + locationPos.lat + "," + locationPos.lng + "&radius=5000&key=AIzaSyBDpFonM0-HhfZ_QmeXBNWkYDHsSL2sxV8",
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
                var marker = new google.maps.Marker({
                    position: locationPos,
                    map: map,
                    title: response.results[i].formatted_address,
                    animation: google.maps.Animation.DROP,
                });
                marker.setMap(map);
    
                //console.log(locationPos);
                if (response.results[i].photos === undefined) {
    
                } else {
                    //photo reference ID
                    photoRef = response.results[i].photos[0]["photo_reference"];
                    console.log("photo: " + photoRef);
                    console.log(response.results[i].photos[0]["photo_reference"]);
                    var photoURL = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + photoRef + "&key=AIzaSyBDpFonM0-HhfZ_QmeXBNWkYDHsSL2sxV8";
    
                    $("#results2").append(
                        "<br>" + response.results[i].name + "</br>" +
                        "<p>" + response.results[i].formatted_address + "</p>" +
                        "<p> Rating: " + response.results[i].rating + "</p>"
                        + "<p> photo: <img src='" + photoURL + "'/> </p>"
                    );
                }
            }
        });
    });
}

$("#submit").on("click", function () {
    event.preventDefault();
    $("#results").empty();
    $("#results2").empty();
    var address = $("#address").val();
    var city = $("#city").val();
    var state = $("#state").val();

    initMapOnSubmit(address, city, state);

    $("#address").val("");
    $("#city").val("");
    $("#state").val("");

})