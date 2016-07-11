'use strict';

var App = require('./stuff/App');
var Blinker = require('./stuff/Blinker');
var Rotator = require('./stuff/Rotator');


var Main = (function() {

    return {

        initialize: function() {
            this._blinkingStuff = [];
            this._rotatingStuff = [];

            this._initApp();
            this._initBlinkers();
            this._initRotate();

        },
        _initApp: function() {
            var canvas = document.getElementById('it');
            var myApp = new App(canvas);
            myApp.draw();
        },
        _initBlinkers: function() {
            var blinkingElements = document.querySelectorAll('[data-blink]');
            var myLength = blinkingElements.length;
            for (var i = 0; i < myLength; i++) {
                var element = blinkingElements[i];
                var optionsData = element.getAttribute('data-blink');
                var options = JSON.parse(optionsData);
                var myBlinky = new Blinker(element, options);
                this._blinkingStuff.push(myBlinky);
            }
        },
        _initRotate: function() {
            var rotatingElements = document.querySelectorAll('[data-rotate]');
            var myLength = rotatingElements.length;
            for (var i = 0; i < myLength; i++) {
                var element = rotatingElements[i];
                var optionsData = element.getAttribute('data-rotate');
                var options = JSON.parse(optionsData);
                var myRotator = new Rotator(element, options);
                this._rotatingStuff.push(myRotator);
            }
        }


    };

}());

module.exports = Main.initialize();
