define(["async!https://maps.googleapis.com/maps/api/js?key=AIzaSyBOK4MGrNVoI2C3pYxFw7hS9S0FDfeBgUw&signed_in=true&callback=initMap"], function () { return Map});

function Map(mapElement){
    var that = this,
    mapConfiguration = {
        zoom: 13,
        center: {lat: 28.1277095, lng: -15.4351978}
    },
    directionsService = new google.maps.DirectionsService,
    directionsDisplay = new google.maps.DirectionsRenderer;

    this.create = function () {
        var map = new google.maps.Map(mapElement, mapConfiguration);
        directionsDisplay.setMap(map);
    };

    this.onChangeHandler = function() {
        that.setRoute(selectedRoute());
    };

    this.setRoute = function (route) {
        directionsService.route(route, onDone);
    };

    function selectedRoute() {
        return {
            origin: $('#start').val(),
            destination: $('#end').val(),
            travelMode: google.maps.TravelMode.DRIVING
        };
    }

    function onDone(response, status ) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    }

}
