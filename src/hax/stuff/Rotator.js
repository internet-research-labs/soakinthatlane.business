'use strict';

var prefix = require('vendor-prefix');

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