require(["../configuration"], function () {

    requirejs.config({
        paths: {
            "jquery": "https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min",

            'async': '../lib/require-plugin/async'
        }
    });

    require(['jquery'], function () {
        require(['src/Main'], function () {
            window.onload = function () {
                Main();
            }
        });
    });
});
