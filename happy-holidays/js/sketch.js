var s = 120;
var tri;

function setup() {
  createCanvas(windowWidth, windowHeight);
  fill(255, 25);

  tri = [
    [0, -s / sqrt(3)],
    [-s / 2, s * 0.5 / sqrt(3)],
    [s / 2, s * 0.5 / sqrt(3)]
  ];

  newTween();
}


function draw() {
  background(255);

  for (var i = 0; i <= width; i++) {
    var j = map(i, 0, width, 0, 1);
    var c = lerpColor(c1, c2, j);
    stroke(c);
    line(i, 0, i, height);
  }
}


function newTween() {
  var gradStart = randomGradient();
    c1 = gradStart[0];
    c2 = gradStart[1];

  t = new MOTION.Tween(100)
            .add(this, 'c1', gradStart[0])
            .add(this, 'c2', gradStart[1])
            .easing(Quad.InOut)
            .relative()
            .play()
            .onEnd(function() {
              var gradEnd = randomGradient();
              t.get('c1').setEnd(gradEnd[0]);
              t.get('c2').setEnd(gradEnd[1]);
              t.play();
            });
}


function randomGradient() {
  var gradient = gradients[Math.floor( Math.random() * gradients.length )];

  var _c1 = hexToRgb(gradient.colour1);
  var _c2 = hexToRgb(gradient.colour2);

  return [color(_c1.r, _c1.g, _c1.b), color(_c2.r, _c2.g, _c2.b)];
}


function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
  } : null;
}


$(document).ready(function(){
  var stars=800;
  var $stars=$(".stars");
  var r=800;
  for(var i=0;i<stars;i++){
    var $star=$("<div/>").addClass("star");
    $stars.append($star);
  }
  $(".star").each(function(){
    var cur=$(this);
    var s=0.2+(Math.random()*1);
    var curR=r+(Math.random()*300);
    cur.css({
      transformOrigin:"0 0 "+curR+"px",
      transform:" translate3d(0,0,-"+curR+"px) rotateY("+(Math.random()*360)+"deg) rotateX("+(Math.random()*-50)+"deg) scale("+s+","+s+")"

    })
  })
})