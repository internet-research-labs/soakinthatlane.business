'use strict';

var App = require('./stuff/App');
var Blinker = require('./stuff/Blinker')


var Main = (function() {

	return {

		initialize: function() {
			this._blinkingStuff = [];

			this._initApp();
			this._initBlinkers();
			console.log('oh shit whadup');
			//var pallies = document.getElementById('');
		},
		_initApp: function() {
			var canvas = document.getElementById('it');
			var myApp = new App(canvas);
			myApp.draw();
		},
		_initBlinkers: function() {
			this._blinkingElements = document.querySelectorAll('[data-blink]');
			var myLength = this._blinkingElements.length;
			for (var i = 0; i < myLength; i++) {
				var element = this._blinkingElements[i];
				var optionsData = element.getAttribute('data-blink');
				var options = JSON.parse(optionsData);
				var myBlinky = new Blinker(element, options);
				this._blinkingStuff.push(myBlinky);
			}
		}


	};

}());

module.exports = Main.initialize();
