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
    var estimatedMinutesToPark = ["17 - 24", "3 - 4", "3 - 4", "19 - 27", "30 - 42", "6 - 8", "4 - 6", "37 - 53"];


    this.create = function () {
        var map = new google.maps.Map(mapElement, mapConfiguration);
        directionsDisplay.setMap(map);
        new google.maps.TrafficLayer().setMap(map);
    };

    this.onChangeHandler = function() {
        $("#settingsRoute").css("display", "none");
        $("#map").css("display", '');

        var route = selectedRoute();
        that.setRoute(route);



        that.create();
    };

    this.calculateParameters = function () {
        var service = new google.maps.DistanceMatrixService();
        var route = selectedRoute();
        service.getDistanceMatrix(
            {
                origins: [route.origin],
                destinations: [route.destination],
                travelMode: google.maps.TravelMode.DRIVING
            }, that.callback);
    };

    function printInfo(results, estimatedToPark, co2) {
        $("#messageDist").append(results.rows[0].elements[0].distance.text);
        $("#messagePark").append(estimatedToPark + " minutos");
        $("#messageEco").append(co2 + " g")
        $("#messageTime").append(results.rows[0].elements[0].duration.text);
        if (estimatedToPark > 15)
            $("#messageAlert").append("<br/><font color='red'> Se recomendaría el uso de transporte público</font>");
    }

    this.callback = function (results, status){
        $("#message").empty();
        if(results) {
            var co2 = parseInt(results.rows[0].elements[0].distance.text.replace("km", "")) * coPerKM;
            var estimatedToPark = estimatedMinutesToPark[parseInt($("#hour").val())];
            printInfo(results, estimatedToPark, co2);
        }
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
