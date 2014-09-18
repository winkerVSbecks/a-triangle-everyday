var gulp = require('gulp');
var connect = require('gulp-connect');
var colors = require('colors');
var watch = require('gulp-watch');
var argv = require('yargs').argv;

var triangles = {
  field: 'triangle-in-a-gradient-field',
  lerp: 'lerping-triangle',
  tada: 'ta-da-triangle',
  splat: 'splat-triangle'
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