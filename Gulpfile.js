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

var options = {

  coffee : {
    files       : 'javascripts/src/*.coffee',
    destination : 'javascripts'
  },

  css : {
    files       : 'stylesheets/*.css',
    destination : 'stylesheets'
  },

  sass : {
    files       : 'stylesheets/*.sass',
    destination : 'stylesheets'
  },

  watch : function() {
    return [ this.coffee.files, this.sass.files ];
  }

};

// -------------------------------------
//   Task: Default
// -------------------------------------

gulp.task( 'default', function() {

  watch( options.watch(), function( files ) {

    gulp.start( 'sass' );
    gulp.start( 'coffee' );

  } );

} );

// -------------------------------------
//   Task: Minify CSS
// -------------------------------------


gulp.task( 'minify-css', function () {

  gulp.src( options.css.files )
      .pipe( minifycss() )
      .pipe( gulp.dest( options.css.destination ) );

} );

// -------------------------------------
//   Task: Sass
// -------------------------------------

gulp.task( 'sass', function () {

  gulp.src( options.sass.files )
      .pipe( sass( { indentedSyntax: true } ) )
      .pipe( gulp.dest( options.sass.destination ) );

} );

// -------------------------------------
//   Task: Coffee
// -------------------------------------

gulp.task( 'coffee', function() {

  gulp.src( options.coffee.files )
    .pipe(  coffee( { bare: true } ).on('error', gutil.log ) )
    .pipe(  gulp.dest( options.coffee.destination ) );

} );

// -------------------------------------
//   Task: Lint
// -------------------------------------

gulp.task( 'lint', function () {

  gulp.src( options.coffee.files )
      .pipe( coffeelint( ) )
      .pipe( coffeelint.reporter( ) )

} );
