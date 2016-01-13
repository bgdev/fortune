/*jslint browser */

(function () {
    'use strict';

    var id = 'logostrip',
        url = 'https://raw.githubusercontent.com/bgdev/fortune/master/cookies',

        handler = function (id) {
            if (this.status === 200) {
                var lines = this.responseText.trim().split('\n');
                var rnd = Math.floor(Math.random() * lines.length);
                var element = document.getElementById(id);
                element.innerHTML = lines[rnd];
            }
        },

        fortune = function (id, url) {
            var req = new XMLHttpRequest();
            req.addEventListener('load', function () {
                handler.call(this, id);
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
