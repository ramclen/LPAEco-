define(['async!https://maps.googleapis.com/maps/api/js?key=AIzaSyBOK4MGrNVoI2C3pYxFw7hS9S0FDfeBgUw&signed_in=true&libraries=places'], function () {
    return Autocomplete;
});

function Autocomplete() {
    var endAutocomplete, startAutocomplete;
    var componentForm = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'long_name',
        postal_code: 'short_name'
    };

    this.initAutocomplete = function () {
        endAutocomplete = new google.maps.places.Autocomplete((document.getElementById('endAutocomplete')),
            {types: ['geocode']});

        startAutocomplete = new google.maps.places.Autocomplete((document.getElementById('startAutocomplete')),
            {types: ['geocode']});

    };


    function geolocate() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var geolocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                var circle = new google.maps.Circle({
                    center: geolocation,
                    radius: position.coords.accuracy
                });
                endAutocomplete.setBounds(circle.getBounds());
                startAutocomplete.setBounds(circle.getBounds());
            });
        }
    }
}