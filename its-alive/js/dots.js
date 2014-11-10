// ---------------------------------------------------
//  Dots
// ---------------------------------------------------
var Dots = function(pos) {
  var res = 4;
  this.paths = new Group({});

  for (var i = 0; i < 100; i += res) {
    for (var j = 0; j < 20; j += res) {
      this.paths.addChild(new Path.Circle({
        center: [i, j],
        radius: 1,
        fillColor: '#fff',
        opacity: Math.random() > 0.5 ? 0.75 : 0.3
      }))
    };
  };

  this.paths.position = pos;
  this.paths.opacity = 0;
};

Dots.prototype.draw = function(t, fadeOut) {
  if (fadeOut && this.paths.opacity > 0) {
    this.paths.opacity -= 0.05;
  } else if (!fadeOut && this.paths.opacity < 1) {
    this.paths.opacity += 0.05;
  }

  this.paths.opacity = this.paths.opacity < 0 ? 0 : this.paths.opacity;

  if (this.paths.opacity >= 1 && !fadeOut) {
    if (_t % 12 === 0) {
      for (var i = this.paths.children.length - 1; i >= 0; i--) {
        this.paths.children[i].opacity = Math.random() > 0.5 ? 0.75 : 0.3;
      };
    }
  }
};