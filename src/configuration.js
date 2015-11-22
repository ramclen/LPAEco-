require(["../configuration"], function () {

    requirejs.config({
        paths: {
            "jquery": "https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min",
            "bootstrap": "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min",
            'async': '../lib/require-plugin/async'
        }
    });

    require(['jquery'], function () {
        require(['src/Main'], function () {
            require(['async!https://maps.googleapis.com/maps/api/js?key=AIzaSyBOK4MGrNVoI2C3pYxFw7hS9S0FDfeBgUw&signed_in=true&callback=initMap&libraries=places'], function () {
                window.onload = function () {
                    Main();
                }
            });
        });
    });
});
