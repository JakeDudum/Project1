
        
        var map, infoWindow;
        var pos = {};
        var open, rating, image, comment;
        var arr = [];
        function initMap() {
            // var queryURL = "https://api.yelp.com/v3/businesses/search/4Rm7FqyoBh0DGVD6bV936T1y38wYSXyOiQBtQsIza6j_MZVWcPuLtT7x_06Ej7j5TN4ZFgsOAxlj_FHlQrjgyfYbXsGuYjQeamj84ii533Ii5sTH4wKUUjhqNqf6XHYx";
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    console.log(position);
                    console.log(pos.lat);
                    // infoWindow.setPosition(pos);
                    // infoWindow.setContent('Location found.');
                    // infoWindow.open(map);
                    // map.setCenter(pos);
                    map = new google.maps.Map(document.getElementById('map'), {
                        center: { lat: pos.lat, lng: pos.lng },
                        zoom: 15
                    });
                    var marker = new google.maps.Marker({
                        position: pos,
                        map: map,
                        title: "You are here.",
                        icon: "http://maps.google.com/mapfiles/ms/icons/purple-dot.png"
                    })
                    var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=Public+Restroom&location=" + pos.lat + "," + pos.lng + "&key=AIzaSyBDpFonM0-HhfZ_QmeXBNWkYDHsSL2sxV8";
                    $.ajax({
                        url: queryURL,
                        method: "GET"
                    }).then(function (response) {
                        console.log(response);
                        for (var i = 0; i < response.results.length; i++) {
                            var locationPos = {
                                lat: response.results[i].geometry.location.lat,
                                lng: response.results[i].geometry.location.lng
                            };
                            var marker = new google.maps.Marker({
                                position: locationPos,
                                map: map,
                                title: response.results[i].formatted_address
                            });
                            marker.setMap(map);
                            //appending to results div
                        }
                    });
                    //appending start of yelp section
                    $.ajax({
                        url: 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=' + pos.lat + '&longitude=' + pos.lng + '&term=public+restroom&reviews&radius=10000&limit=15&attributes=gender_neutral_restrooms',
                        method: "GET",
                        headers: {
                            authorization: "Bearer 4Rm7FqyoBh0DGVD6bV936T1y38wYSXyOiQBtQsIza6j_MZVWcPuLtT7x_06Ej7j5TN4ZFgsOAxlj_FHlQrjgyfYbXsGuYjQeamj84ii533Ii5sTH4wKUUjhqNqf6XHYx"
                        }
                    }).then(function (response) {
                        console.log(response);
                            
                        for (var i = 0; i < response.businesses.length; i++) {
                            var locationPos = {
                                lat: response.businesses[i].coordinates.latitude,
                                lng: response.businesses[i].coordinates.longitude
                            };
                            
                            var marker = new google.maps.Marker({
                                position: locationPos,
                                map: map,
                                title: response.businesses[i].alias,
                                // reviews: response.businesses[i].reviews,
                                icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                            });
         
                            marker.setMap(map);
                            //appending to results div
                        };
                    });
                    // function weatherWidget() {
                    // var city = $('#').val();
                    // if (city !== '') {
                    var apiKey = "e9d3c600773e0277e03e42289aeaf483";
                    $.ajax({
                        url: 'https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?lat=' + pos.lat + '&lon=' + pos.lng + '&units=imperial&appid=' + apiKey,
                        method: "GET"
                        
                    }).then(function(response) {
                        console.log(response);
                        var newWeatherDiv = $("<div>");
                        var name = response.name + ": ";
                        var currentTemp = response.main.temp + "F°";
                        newWeatherDiv.append(name + currentTemp);
                        $("#weather").append(newWeatherDiv);
                        // var windowWidget = window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];  window.myWidgetParam.push({id: 9,cityid: '5391959',appid: 'e9d3c600773e0277e03e42289aeaf483',units: 'imperial',containerid: 'openweathermap-widget-9',  });  (function() {var script = document.createElement('script');script.async = true;script.charset = "utf-8";script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(script, s);  })();
                        // $("#openweathermap-widget-9").append(windowWidget);
                        
                    });
                }, function () {
                    handleLocationError(true, infoWindow, map.getCenter());
                    
                });
            }
            else {
                handleLocationError(true, infoWindow, map.getCenter());
            }
        }
        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
            infoWindow.setPosition(pos);
            infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' :
                'Error: Your browser doesn\'t support geolocation.');
            infoWindow.open(map);
        }
        
                        

    // $('#openweathermap-widget-9').html(_show(response));
    // _loadView('weather');
    // })
    // ;
    // ;     
    // } else {
    // $('#error').html('Field cannot be empty');
    // }
    // }
    // function show(response) {
        
    //     window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];  
    // window.myWidgetParam.push({
    //     id: 9,
    //     cityid: '5391959',
    //     appid: 'e9d3c600773e0277e03e42289aeaf483',
    //     units: 'imperial',
    //     containerid: 'openweathermap-widget-9'
    //  });  (function() {
    //      var script = document.createElement('script');
    //      script.async = true;
    //      script.charset = "utf-8";
    //      script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
    //      var s = document.getElementsByTagName('script')[0];
    //      s.parentNode.insertBefore(script, s); 
    //      })();
    //     }       
    //                 });
    //             }
    //         }

    //     


 