// *************************************
//
//   Gulpfile
//
// *************************************

// -------------------------------------
//   Modules
// -------------------------------------

var gulp         = require( 'gulp' );              // all
var watch        = require( 'gulp-watch' );        // all
var plumber      = require( 'gulp-plumber' );      // all
var coffee       = require( 'gulp-coffee' );       // coffee
var coffeelint   = require( 'gulp-coffeelint' );   // coffee
var gutil        = require( 'gulp-util' );         // coffee
var autoprefixer = require( 'gulp-autoprefixer' ); // css
var minifycss    = require( 'gulp-minify-css' )    // minify-css
var rename       = require( 'gulp-rename' );       // minify-css
var sass         = require( 'gulp-sass' );         // sass
var uglify       = require( 'gulp-uglify' );       // uglify

// -------------------------------------
//   Options
// -------------------------------------

var options = {

  build : {
    tasks       : [ 'minify-css', 'uglify' ],
    destination : 'build/'
  },

  coffee : {
    files       : 'source/javascripts/src/*.coffee',
    destination : 'source/javascripts'
  },

  css : {
    files       : 'source/stylesheets/*.css',
    file        : 'source/stylesheets/application.css',
    destination : 'source/stylesheets'
  },

  js : {
    files       : 'source/javascripts/*.js',
    file        : 'source/javascripts/application.js',
    destination : 'source/javascripts'
  },

  sass : {
    files       : 'source/stylesheets/*.sass',
    destination : 'source/stylesheets'
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
    gulp.start( 'build' );

  } );

} );

// -------------------------------------
//   Task: Build
// -------------------------------------

gulp.task( 'build', function() {

  options.build.tasks.forEach( function( task ) {
    gulp.start( task );
  } );

});

// -------------------------------------
//   Task: Coffee
// -------------------------------------

gulp.task( 'coffee', function() {

  gulp.src( options.coffee.files )
    .pipe( plumber() )
    .pipe( coffee( { bare: true } ) )
    .pipe( gulp.dest( options.coffee.destination ) );

} );

// -------------------------------------
//   Task: Lint
// -------------------------------------

gulp.task( 'lint', function () {

  gulp.src( options.coffee.files )
      .pipe( plumber() )
      .pipe( coffeelint() )
      .pipe( coffeelint.reporter() )

} );

// -------------------------------------
//   Task: Minify CSS
// -------------------------------------


gulp.task( 'minify-css', function () {

  gulp.src( options.css.file )
      .pipe( plumber() )
      .pipe( minifycss() )
      .pipe( rename( { suffix: '.min' } ) )
      .pipe( gulp.dest( options.build.destination ) );

} );

// -------------------------------------
//   Task: Sass
// -------------------------------------

gulp.task( 'sass', function () {

  gulp.src( options.sass.files )
      .pipe( plumber() )
      .pipe( sass( { indentedSyntax: true } ) )
      .pipe( autoprefixer( {
              browsers : [ 'last 2 versions' ],
              cascade  : false
          } ) )
      .pipe( gulp.dest( options.sass.destination ) );

} );

// -------------------------------------
//   Uglify
// -------------------------------------

gulp.task( 'uglify', function () {

  gulp.src( options.js.file )
      .pipe( plumber() )
      .pipe( uglify() )
      .pipe( rename( { suffix: '.min' } ) )
      .pipe( gulp.dest( options.build.destination ) );

} );
