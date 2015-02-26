requirejs.config({
    "paths": {
        "jquery": "https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min",
        "bootstrap": "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min",
        "leaflet": "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.3/leaflet"
    },
    shim: {
        "leaflet": {
            exports: 'L'
        },
        "bootstrap": {
            "deps": ['jquery']
        }
    }
});

require(
['jquery', 'leaflet'],
    function (jQuery) {
        var resize = function(){
            jQuery("#map").height(jQuery(window).height() - jQuery("h1").height());
        };
        jQuery(window).resize(resize);
        resize();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
                var map = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);
                L.tileLayer('http://api.tiles.mapbox.com/v4/YOURMAPID/{z}/{x}/{y}.png?access_token=YOURACCESSTOKEN', {
                    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
                    maxZoom: 18
                }).addTo(map);
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }
);
