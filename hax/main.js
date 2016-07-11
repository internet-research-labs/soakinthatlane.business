/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2);


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var App = __webpack_require__(3);
	var Blinker = __webpack_require__(4)


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


/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	function App(element){
	    this._canvas = element;
	    this._width = this._canvas.width;
	    this._height = this._canvas.height;
	    this._context = this._canvas.getContext('2d');

	    this._NUM_RECTS = 10;
	    this._DX = this.width / this._NUM_RECTS;
	    this._DY = this.height / this._NUM_RECTS;

	    this._setup();
	}

	var proto = App.prototype;

	proto._setup = function(){
	    this._context.strokeStyle = "rgba(0, 0, 0, .1)";
	    this._context.lineWidth = "0.2";
	    this._context.lineWidth = "0.1";
	}

	proto.update = function() {

	}

	proto._drawBox = function(x, y ,w, h) {
	    var top = x - w/2.;
	    var bot = y - h/2.;
	    this._context.rect(top, bot, w, h);
	    this._context.stroke();
	}

	proto.draw = function() {

	    for (var i=-2; i < this._NUM_RECTS+2; i++) {
	        for (var j=-2; j < this._NUM_RECTS+2; j++) {
	            var x = i*this._DX;
	            var y = j*this._DY;
	            if (j % 2 == 0) {
	                x = i * this._DX;
	            } else {
	                x = (i+0.5)*this._DX;
	            }
	            var w = this._DX*0.2;
	            var h = this._DY*0.2;

	            this._drawBox(x, y, w, h);
	        }
	    }
	}

	module.exports = App;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	var CLASS = 'blink';

	function Blinker(element, options) {

	    this._element = element || [];
	    this._options = options || [];
	    this._duration = options.duration || 2000;
	    this._delay = options.delay || 2000;
	    this._blink = options.blink || true;
	    this._cl = this._element.classList;

	    this._initialize();

	}

	var proto = Blinker.prototype;

	proto._initialize = function() {
	    if(this._blink) {
	        setTimeout(this._on.bind(this), this._delay);
	    }
	}

	proto._on = function() {
	    this._cl.add('blink');
	    setTimeout(this._off.bind(this), this._duration)
	}

	proto._off = function() {
	    this._cl.remove('blink');
	    if(this._blink) {
	        setTimeout(this._on.bind(this), this._delay);
	    }
	}

	proto.stop = function() {
	    this._blink = false;
	}

	proto.start = function() {
	    this._blink = true;
	    this._initialize();
	}

	module.exports = Blinker;

/***/ }
/******/ ]);