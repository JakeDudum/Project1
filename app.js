//reminder: firebase 


var map, infoWindow;
var pos = {}; 
var open, rating, image, comment; 
function initMap() {
    var queryURL = "https://api.yelp.com/v3/businesses/search/4Rm7FqyoBh0DGVD6bV936T1y38wYSXyOiQBtQsIza6j_MZVWcPuLtT7x_06Ej7j5TN4ZFgsOAxlj_FHlQrjgyfYbXsGuYjQeamj84ii533Ii5sTH4wKUUjhqNqf6XHYx";
console.log(queryURL)
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            console.log(position);
            console.log(pos.lat);

            map = new google.maps.Map(document.getElementById ("map"), {
                center: { lat: pos.lat, lng: pos.lng},
                zoom: 15
            });
        })
    }
}