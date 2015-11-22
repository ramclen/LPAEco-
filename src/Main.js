define(['src/Map', 'src/Autocomplete', 'bootstrap'], function () {
    return new Main().main();
});

function Main() {

    function directionEvent(map) {
        $('#startAutocomplete').on('change', map.onChangeHandler);
        $('#endAutocomplete').on('change', map.onChangeHandler);
    }

    this.main = function () {
        $('#routeSearch').modal('toggle');
        $('#setRoute').on('click', function () {
            $('#endAutocomplete').trigger('change');
            $('#routeSearch').modal('toggle');
        });

        var map = new Map(document.getElementById('map'));
        directionEvent(map);
        $("#preCalculateRoute").on('click', function () {
            $('#endAutocomplete').trigger('change');
            $("#message").append(map.callback())
        });
        new Autocomplete().initAutocomplete();

        map.create();
    }
}