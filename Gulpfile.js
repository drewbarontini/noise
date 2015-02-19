// *************************************
//
//   Gulpfile
//
// *************************************

// -------------------------------------
//   Modules
// -------------------------------------

var gulp       = require( 'gulp' );
    coffee     = require( 'gulp-coffee' ),
    gutil      = require( 'gulp-util' ),
    watch      = require( 'gulp-watch' ),
    es         = require( 'event-stream' ),
    coffeelint = require( 'gulp-coffeelint' )
    sass       = require( 'gulp-sass' );

// -------------------------------------
//   Variables
// -------------------------------------

var coffeeFiles     = 'javascripts/src/*.coffee';
var coffeeSpecFiles = 'spec/javascripts/src/*.coffee';
var jsFiles         = 'javascripts/';
var jsSpecFiles     = 'spec/javascripts/';
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
