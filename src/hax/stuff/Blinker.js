'use strict';

var CLASS = 'blink';

function Blinker(element, options) {

	this._element = element || [];
	this._options = options || [];
	this._duration = options.duration || 2000;
	this._delay = options.delay || 2000;
	this._blink = true;
	this._cl = this._element.classList;

	this._initialize();

}

var proto = Blinker.prototype;

proto._initialize = function() {
	console.log('initial');
	setTimeout(this._on.bind(this), this._delay);
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