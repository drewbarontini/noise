// *************************************
//
//   Gulpfile
//
// *************************************

// -------------------------------------
//   Modules
// -------------------------------------

var gulp       = require( 'gulp' );            // all
var watch      = require( 'gulp-watch' );      // all
var coffee     = require( 'gulp-coffee' );     // coffee
var coffeelint = require( 'gulp-coffeelint' ); // coffee
var gutil      = require( 'gulp-util' );       // coffee
var minifycss  = require( 'gulp-minify-css' )  // minify-css
var rename     = require( 'rename' );          // minify-css
var sass       = require( 'gulp-sass' );       // sass
var uglify     = require( 'gulp-uglify' );     // uglify

// -------------------------------------
//   Options
// -------------------------------------

var options = {

  coffee : {
    files       : 'javascripts/src/*.coffee',
    destination : 'javascripts'
  },

  css : {
    files       : 'stylesheets/*.css',
    file        : 'stylesheets/application.css',
    destination : 'stylesheets'
  },

  js : {
    files       : 'javascripts/*.js',
    file        : 'javascripts/application.js',
    destination : 'javascripts'
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
    gulp.start( 'minify-css' );

  } );

} );

// -------------------------------------
//   Task: Coffee
// -------------------------------------

gulp.task( 'coffee', function() {

  gulp.src( options.coffee.files )
    .pipe( coffee( { bare: true } ).on( 'error', gutil.log ) )
    .pipe( gulp.dest( options.coffee.destination ) );

} );

// -------------------------------------
//   Task: Lint
// -------------------------------------

gulp.task( 'lint', function () {

  gulp.src( options.coffee.files )
      .pipe( coffeelint() )
      .on( 'error', function( error ) { console.log( error.message ); } )
      .pipe( coffeelint.reporter( ) )

} );

// -------------------------------------
//   Task: Minify CSS
// -------------------------------------


gulp.task( 'minify-css', function () {

  gulp.src( options.css.file )
      .pipe( minifycss() )
      .on( 'error', function( error ) { console.log( error.message ); } )
      .pipe( rename( { suffix: '.min' } ) )
      .on( 'error', function( error ) { console.log( error.message ); } )
      .pipe( gulp.dest( options.css.destination ) );

} );

// -------------------------------------
//   Task: Sass
// -------------------------------------

gulp.task( 'sass', function () {

  gulp.src( options.sass.files )
      .pipe( sass( { indentedSyntax: true } ) )
      .on( 'error', function( error ) { console.log( error.message ); } )
      .pipe( gulp.dest( options.sass.destination ) );

} );

// -------------------------------------
//   Uglify
// -------------------------------------

gulp.task( 'uglify', function () {

  gulp.src( options.js.file )
      .pipe( uglify() )
      .on( 'error', function( error ) { console.log( error.message ); } )
      .pipe( gulp.dest( options.js.destination ) );

} );
