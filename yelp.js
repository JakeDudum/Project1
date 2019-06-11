var map, infoWindow;
var pos = {};

function initMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position){
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