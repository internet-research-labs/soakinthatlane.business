function drawBox(ctx, x, y, w, h) {
  var top = x - w/2.;
  var bot = y - h/2.;
  ctx.rect(top, bot, w, h);
  ctx.stroke();
};

function App(id) {
  this.canvas = document.getElementById(id);
  this.width = this.canvas.width;
  this.height = this.canvas.height;
  this.context = this.canvas.getContext('2d');
}

App.prototype.setup = function () {
};

App.prototype.update = function () {
};

App.prototype.draw = function () {
  var ctx = this.context;

  const NUM_RECTS = 10;
  const DX = this.width / NUM_RECTS;
  const DY = this.height / NUM_RECTS;

  ctx.strokeStyle = "rgba(0, 0, 0, .1)";
  ctx.lineWidth = "0.2";
  ctx.lineWidth = "0.1";

  for (var i=-2; i < NUM_RECTS+2; i++) {
    for (var j=-2; j < NUM_RECTS+2; j++) {
      var x = i*DX;
      var y = j*DY;
      if (j % 2 == 0) {
        x = i * DX;
      } else {
        x = (i+0.5)*DX;
      }
      var w = DX*0.2;
      var h = DY*0.2;
      drawBox(ctx, x, y, w, h);
    }
  }
};
