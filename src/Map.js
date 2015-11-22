define(["async!https://maps.googleapis.com/maps/api/js?key=AIzaSyBOK4MGrNVoI2C3pYxFw7hS9S0FDfeBgUw&signed_in=true&callback=initMap&libraries=places"], function () { return Map});

function Map(mapElement){
    var that = this,
        mapConfiguration = {
            zoom: 13,
            center: {lat: 28.1277095, lng: -15.4351978}
        },
        coPerKM= 140,
    directionsService = new google.maps.DirectionsService,
    directionsDisplay = new google.maps.DirectionsRenderer;

    this.create = function () {
        var map = new google.maps.Map(mapElement, mapConfiguration);
        directionsDisplay.setMap(map);
        new google.maps.TrafficLayer().setMap(map);
    };

    this.onChangeHandler = function() {
        var route = selectedRoute();
        that.setRoute(route);
        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
            {
                origins: [route.origin],
                destinations: [route.destination],
                travelMode: google.maps.TravelMode.DRIVING
            }, that.callback);
    };

    this.callback = function (results, status){
        $("#message").empty();
        var co2 = parseInt(results.rows[0].elements[0].distance.text.replace("km","")) * coPerKM;
        $("#message").append("Distancia: <b>" +
                    results.rows[0].elements[0].distance.text +
                    "</b> Duración: <b>" +
                    results.rows[0].elements[0].duration.text+
                    "</b> CO2 generado: <b>" +
                    co2 + " g </b>");

    };

    this.setRoute = function (route) {
        directionsService.route(route, onDone);
    };

    function selectedRoute() {
        return {
            origin: $('#startAutocomplete').val().toLowerCase(),
            destination: $('#endAutocomplete').val().toLowerCase(),
            travelMode: google.maps.TravelMode.DRIVING
        };
    }

    function onDone(response, status ) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        } else {
            //window.alert('Directions request failed due to ' + status);
        }
    }

}
