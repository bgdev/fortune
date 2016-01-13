/*jslint browser */

(function () {
    'use strict';

    var id = 'logostrip',
        url = 'https://raw.githubusercontent.com/bgdev/fortune/master/cookies',
        storage = sessionStorage.getItem('quote'),

        handler = function (req, id) {
            if (req.status === 200) {
                var lines = req.responseText.trim().split('\n'),
                    rnd = Math.floor(Math.random() * lines.length);
                setHTML(id, lines[rnd]);
                sessionStorage.setItem('quote', lines[rnd]);
            }
        },

        fortune = function (id, url) {
            var req = new XMLHttpRequest();
            req.addEventListener('load', function () {
                handler.call(null, this, id);
            });
            req.open('GET', url);
            req.send();
        },

        setHTML = function (id, html) {
            var element = document.getElementById(id);
            element.innerHTML = html;
        };
    if (storage) {
        setHTML(id, storage);
    } else {
        fortune(id, url);
    }
    // Polyfill String::trim()
    if (!String.prototype.trim) {
        String.prototype.trim = function () {
            return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
        };
    }
}());
