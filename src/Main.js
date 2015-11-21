define(['src/Map'], function () {
    return new Main().main();
});

function Main() {

    function directionEvent(map) {
        $('#start').on('change', map.onChangeHandler);
        $('#end').on('change', map.onChangeHandler);
    }

    this.main = function () {
        var map = new Map(document.getElementById('map'));
        directionEvent(map);
        map.create();
    }
}
