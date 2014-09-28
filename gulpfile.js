var gulp = require('gulp');
var connect = require('gulp-connect');
var colors = require('colors');
var watch = require('gulp-watch');
var argv = require('yargs').argv;

var triangles = {
  field         : 'triangle-in-a-gradient-field',
  lerp          : 'lerping-triangle',
  tada          : 'ta-da-triangle',
  splat         : 'splat-triangle',
  svg           : 'svg-triangle',
  pulse         : 'svg-triangle-pulse',
  lazer         : 'svg-triangle-pulse-lazer',
  pyramid       : 'triangle-which-is-really-a-pyramid',
  what          : 'what-is-a-triangle',
  centroid      : 'the-centroid',
  circumcenter  : 'the-circumcenter',
  shadow        : 'triangle-with-a-shadow',
  vertexGrad    : 'vertex-color-interpolation',
  graph         : 'graph-triangle',
  edit          : 'editable-triangle'
};

gulp.task('dev', function() {
  // Get the project dir
  var dir = triangles[argv.p] + '/' || '';
  // Start a server
  connect.server({
    root: '',
    port: 3000,
    livereload: true
  });
  console.log('[CONNECT] Listening on port 3000'.yellow.inverse);
  // Watch HTML files for changes
  console.log('[CONNECT] Watching files for live-reload'.blue);
  watch({
    glob: ['./'+ dir +'js/**.js', './css/**.css', './'+ dir +'css/**.css', './'+ dir +'index.html', './index.html']
  })
    .pipe(connect.reload());
});

gulp.task('default', [], function() {
  console.log('***********************'.yellow);
  console.log('  gulp dev: use the -p flag and pass in the project name to run it'.yellow);
  console.log('  for eg: gulp dev -p field'.yellow);
  console.log('***********************'.yellow);
  return true;
});