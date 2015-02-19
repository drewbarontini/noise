// *************************************
//
//   Gulpfile
//
// *************************************

// -------------------------------------
//   Modules
// -------------------------------------

// ----- Shared ----- //

var gulp  = require( 'gulp' );
var watch = require( 'gulp-watch' );

// ----- Coffee ----- //

var coffee = require( 'gulp-coffee' );
var es     = require( 'event-stream' );
var gutil  = require( 'gulp-util' );

// ----- Coffee Lint ----- //

var coffeelint = require( 'gulp-coffeelint' );

// ----- Minify CSS ----- //

 var cssmin = require( 'gulp-minify-css' )

// ----- Sass ----- //

var sass = require( 'gulp-sass' );

// -------------------------------------
//   Variables
// -------------------------------------

// ----- Coffee ----- //

var coffeeFiles     = 'javascripts/src/*.coffee';
var coffeeSpecFiles = 'spec/javascripts/src/*.coffee';
var jsFiles         = 'javascripts/';
var jsSpecFiles     = 'spec/javascripts/';

// ----- Sass ----- //

var sassFiles       = 'stylesheets/*.sass';
var cssFiles        = 'stylesheets';

// -------------------------------------
//   Task: Default
// -------------------------------------

gulp.task( 'default', function() {

  watch( [ sassFiles, coffeeFiles, coffeeSpecFiles ], function( files ) {

    gulp.start( 'sass' );
    gulp.start( 'coffee' );

  } );

} );

// -------------------------------------
//   Task: Minify CSS
// -------------------------------------


gulp.task( 'minify-css', function () {

  gulp.src( cssFiles )
      .pipe( minifycss( { indentedSyntax: true } ) )
      .pipe( gulp.dest( cssFiles ) );

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
