'use strict';

function App(asdf){
	this._canvas = asdf;
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