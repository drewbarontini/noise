var gulp       = require('gulp');
    coffee     = require('gulp-coffee'),
    gutil      = require('gulp-util'),
    watch      = require('gulp-watch'),
    es         = require('event-stream'),
    coffeelint = require('gulp-coffeelint');

var srcFiles  = 'components/*.coffee';
var specFiles = 'spec/*.coffee';

gulp.task('default', function() {
  watch([srcFiles, specFiles], function(files) {
    gulp.start('coffee');
  });
});

gulp.task('coffee', function() {
  var components = gulp.src(srcFiles)
    .pipe( coffee({ bare: true }).on('error', gutil.log) )
    .pipe( gulp.dest('components/js/') );

  var tests = gulp.src(specFiles)
    .pipe( coffee({ bare: true }).on('error', gutil.log) )
    .pipe( gulp.dest('spec/javascripts/') );

  return es.concat(components, tests);
});

gulp.task('lint', function () {
    gulp.src(srcFiles)
        .pipe(coffeelint())
        .pipe(coffeelint.reporter())
});
