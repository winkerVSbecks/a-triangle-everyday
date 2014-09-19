var path, text;

paper.install(window);

window.onload = function() {
  paper.setup('triangle-which-is-really-a-pyramid');
  document.getElementById('triangle-which-is-really-a-pyramid').style.backgroundColor = '#EBECEE';

  w = paper.view.size.width;
  h = paper.view.size.height;

  path = new Path();
  path.style = {
    strokeColor: '#444',
    strokeWidth: 1,
    strokeCap: 'round',
    strokeJoin: 'round'
  };
  path.add(new Point(44, -32));
  path.add(new Point(0, 0));
  path.add(new Point(12, 24));
  path.add(new Point(56, 30));
  path.add(new Point(44, -32));
  path.add(new Point(12, 24));
  path.add(new Point(0, 0));
  path.add(new Point(56, 30));

  text = new PointText(new Point(paper.view.center.x, paper.view.center.y + 60));
  text.justification = 'center';
  text.fillColor = 'black';
  text.fontSize = 10;
  text.content = 'This triangle evolved to become a regular pyramid.';

  path.position = paper.view.center;
  paper.view.draw();
};

window.onresize = function (event) {
  path.position = paper.view.center;
  text.position = new Point(paper.view.center.x, paper.view.center.y + 60);
};
