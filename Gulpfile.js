// *************************************
//
//   Gulpfile
//
// *************************************

// -------------------------------------
//   Modules
// -------------------------------------

var gulp       = require( 'gulp' );
var watch      = require( 'gulp-watch' );
var coffee     = require( 'gulp-coffee' );
var es         = require( 'event-stream' );
var gutil      = require( 'gulp-util' );
var coffeelint = require( 'gulp-coffeelint' );
var minifycss  = require( 'gulp-minify-css' )
var sass       = require( 'gulp-sass' );

// -------------------------------------
//   Variables
// -------------------------------------

var coffeeFiles     = 'javascripts/src/*.coffee';
var coffeeSpecFiles = 'spec/javascripts/src/*.coffee';
var jsFiles         = 'javascripts/';
var jsSpecFiles     = 'spec/javascripts/';
var sassFiles       = 'stylesheets/*.sass';
var cssFiles        = 'stylesheets';
var filesToWatch    = [ sassFiles, coffeeFiles, coffeeSpecFiles ];

// -------------------------------------
//   Task: Default
// -------------------------------------

gulp.task( 'default', function() {

  watch( filesToWatch, function( files ) {

    gulp.start( 'sass' );
    gulp.start( 'coffee' );

  } );

} );

// -------------------------------------
//   Task: Minify CSS
// -------------------------------------


gulp.task( 'minify-css', function () {

  gulp.src( cssFiles )
      .pipe( minifycss( { keepBreaks: true } ) )
      .pipe( gulp.dest( cssFiles + '/*.css' ) );

} );

// -------------------------------------
//   Task: Sass
// -------------------------------------

gulp.task( 'sass', function () {

  gulp.src( sassFiles )
      .pipe( sass( { indentedSyntax: true } ) )
      .pipe( gulp.dest( cssFiles ) );

} );

// -------------------------------------
//   Task: Coffee
// -------------------------------------

gulp.task( 'coffee', function() {

  var components = gulp.src( srcFiles )
    .pipe(  coffee( { bare: true } ).on('error', gutil.log ) )
    .pipe(  gulp.dest( jsFiles ) );

  var tests = gulp.src( specFiles )
    .pipe(  coffee( { bare: true } ).on('error', gutil.log ) )
    .pipe(  gulp.dest( jsSpecFiles ) );

  return es.concat( components, tests );

} );

// -------------------------------------
//   Task: Lint
// -------------------------------------

gulp.task( 'lint', function () {

  gulp.src( srcFiles )
      .pipe( coffeelint( ) )
      .pipe( coffeelint.reporter( ) )

} );
