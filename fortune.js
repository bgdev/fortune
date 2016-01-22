/*jslint browser */

(function () {
    'use strict';

    var id = 'logostrip',
        url = 'https://raw.githubusercontent.com/bgdev/fortune/master/cookies',

        handler = function (req, id) {
            if (req.status === 200) {
                var lines = req.responseText.trim().split('\n'),
                    rnd = Math.floor(Math.random() * lines.length),
                    element = document.getElementById(id);
                element.innerHTML = lines[rnd];
            }
        },

        fortune = function (id, url) {
            var req = new XMLHttpRequest();
            req.addEventListener('load', function () {
                handler.call(null, this, id);
            });
            req.open('GET', url);
            req.send();
        };

    fortune(id, url);

    // Polyfill String::trim()
    if (!String.prototype.trim) {
        String.prototype.trim = function () {
            return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
        };
    }
}());
