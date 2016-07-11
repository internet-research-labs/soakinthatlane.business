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
	var Blinker = __webpack_require__(4);
	var Rotator = __webpack_require__(5);


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

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var prefix = __webpack_require__(6);

	function Rotator(element, options){
	    this._element = element;
	    this._n = 0;
	    this._ny = 0;
	    this._rotInt = 0;
	    this._rotYInt = 0;

	    this._transform = prefix('transform');
	    this._translate = 0;
	    this._move = options.move || 27;

	    this._on = false;

	    this._initialize();

	}

	var proto = Rotator.prototype;

	proto._initialize = function() {
	    this._element.addEventListener('mouseover', this._mouseOn.bind(this));

	    this._element.addEventListener('mouseout', this._mouseOff.bind(this));

	    this._element.addEventListener('click', this._click.bind(this));
	}

	proto._click = function(){
	    this._translate = this._translate + this._move;
	    this._updateElement();
	}

	proto._mouseOn = function() {
	    this._on = true;
	    this._rotate();
	}

	proto._mouseOff = function() {
	    this._on = false;
	}

	proto._rotate = function() {
	    clearInterval(this._rotINT);
	    this._rotINT = setInterval(this._startRotate.bind(this), 10);

	}

	proto._startRotate = function() {
	    this._n = this._n + 1;

	    if ((this._n == 180) || (this._n == 360)) {
	        clearInterval(this._rotINT);
	    }

	    if (this._n == 360) {this._n = 0;}

	    this._updateElement();

	    if (this._on) {
	        requestAnimationFrame(this._startRotate.bind(this));
	    }
	}

	proto._updateElement = function() {
	    var myTransform = 'rotate(' + this._n + 'deg) translate(0px,' + this._translate + 'px)';
	    this._element.style[this._transform] = myTransform;

	}

	module.exports = Rotator;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	var style = document.createElement('p').style,
	    prefixes = 'O ms Moz webkit'.split(' '),
	    hasPrefix = /^(o|ms|moz|webkit)/,
	    upper = /([A-Z])/g,
	    memo = {};

	function get(key){
	    return (key in memo) ? memo[key] : memo[key] = prefix(key);
	}

	function prefix(key){
	    var capitalizedKey = key.replace(/-([a-z])/g, function(s, match){
	            return match.toUpperCase();
	        }),
	        i = prefixes.length,
	        name;

	    if (style[capitalizedKey] !== undefined) return capitalizedKey;

	    capitalizedKey = capitalize(key);

	    while (i--) {
	        name = prefixes[i] + capitalizedKey;
	        if (style[name] !== undefined) return name;
	    }

	    throw new Error('unable to prefix ' + key);
	}

	function capitalize(str){
	    return str.charAt(0).toUpperCase() + str.slice(1);
	}

	function dashedPrefix(key){
	    var prefixedKey = get(key),
	        upper = /([A-Z])/g;

	    if (upper.test(prefixedKey)) {
	        prefixedKey = (hasPrefix.test(prefixedKey) ? '-' : '') + prefixedKey.replace(upper, '-$1');
	    }

	    return prefixedKey.toLowerCase();
	}

	module.exports = get;
	module.exports.dash = dashedPrefix;


/***/ }
/******/ ]);