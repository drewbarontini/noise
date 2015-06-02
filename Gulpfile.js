// *************************************
//
//   Gulpfile
//
// *************************************
//
// Available tasks:
//   `gulp`
//   `gulp build`
//   `gulp compile:coffee`
//   `gulp compile:sass`
//   `gulp icons`
//   `gulp lint:coffee`
//   `gulp minify:css`
//   `gulp minify:js`
//   `gulp test:css`
//   `gulp test:js`
//
// *************************************

// -------------------------------------
//   Plugins
// -------------------------------------
//
// gulp              : The streaming build system
// gulp-autoprefixer : Prefix CSS
// gulp-coffee       : Compile CoffeeScript files
// gulp-coffeelint   : Lint your CoffeeScript
// gulp-concat       : Concatenate files
// gulp-csscss       : CSS redundancy analyzer
// gulp-jshint       : JavaScript code quality tool
// gulp-load-plugins : Automatically load Gulp plugins
// gulp-minify-css   : Minify CSS
// gulp-parker       : Stylesheet analysis tool
// gulp-plumber      : Prevent pipe breaking from errors
// gulp-rename       : Rename files
// gulp-sass         : Compile Sass
// gulp-svgmin       : Minify SVG files
// gulp-svgstore     : Combine SVG files into one
// gulp-uglify       : Minify JavaScript with UglifyJS
// gulp-util         : Utility functions
// gulp-watch        : Watch stream
// run-sequence      : Run a series of dependent Gulp tasks in order
//
// -------------------------------------

var gulp    = require( 'gulp' );
var run     = require( 'run-sequence' );
var plugins = require( 'gulp-load-plugins' )( {

  rename : {
    'gulp-minify-css': 'cssmin'
  }

} );

// -------------------------------------
//   Options
// -------------------------------------

var options = {

  // ----- Build ----- //

  build : {
    tasks       : [ 'minify:css', 'minify:js' ],
    destination : 'build/'
  },

  // ----- Coffee ----- //

  coffee : {
    files       : 'source/javascripts/src/*.coffee',
    file        : 'application.js',
    destination : 'source/javascripts'
  },

  // ----- CSS ----- //

  css : {
    files       : 'source/stylesheets/*.css',
    file        : 'source/stylesheets/application.css',
    destination : 'source/stylesheets'
  },

  // ----- JavaScript ----- //

  js : {
    files       : 'source/javascripts/*.js',
    file        : 'source/javascripts/application.js',
    destination : 'source/javascripts'
  },

  // ----- Icons ----- //

  icons : {
    files       : 'source/images/icons/icon-*.svg',
    destination : 'source/images/icons'
  },

  // ----- Sass ----- //

  sass : {
    files       : 'source/stylesheets/*.sass',
    destination : 'source/stylesheets'
  },

  // ----- Watch ----- //

  watch : {
    run : function() {
      return [ options.coffee.files, options.sass.files ];
    },
    tasks : [ [ 'compile:sass', 'compile:coffee', 'minify:css' ], 'build' ]
  }

};

// -------------------------------------
//   Task: Default
// -------------------------------------

gulp.task( 'default', function() {

  plugins.watch( options.watch.run(), function( files ) {
    run( options.watch.tasks[0], options.watch.tasks[1] );
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
//   Task: Compile: Coffee
// -------------------------------------

gulp.task( 'compile:coffee', function() {

  gulp.src( options.coffee.files )
    .pipe( plugins.plumber() )
    .pipe( plugins.coffee( { bare: true } ) )
    .pipe( plugins.concat( options.coffee.file ) )
    .pipe( gulp.dest( options.coffee.destination ) );

} );

// -------------------------------------
//   Task: Compile: Sass
// -------------------------------------

gulp.task( 'compile:sass', function () {

  gulp.src( options.sass.files )
    .pipe( plugins.plumber() )
    .pipe( plugins.sass( { indentedSyntax: true } ) )
    .pipe( plugins.autoprefixer( {
            browsers : [ 'last 2 versions' ],
            cascade  : false
        } ) )
    .pipe( gulp.dest( options.sass.destination ) );

} );

// -------------------------------------
//   Task: Icons
// -------------------------------------

gulp.task( 'icons', function() {

  gulp.src( options.icons.files )
    .pipe( plugins.svgmin() )
    .pipe( plugins.svgstore( { inlineSvg: true } ) )
    .pipe( gulp.dest( options.icons.destination ) );

});

// -------------------------------------
//   Task: Lint Coffee
// -------------------------------------

gulp.task( 'lint:coffee', function () {

  gulp.src( options.coffee.files )
    .pipe( plugins.plumber() )
    .pipe( plugins.coffeelint() )
    .pipe( plugins.coffeelint.reporter() )

} );

// -------------------------------------
//   Task: Minify: CSS
// -------------------------------------

gulp.task( 'minify:css', function () {

  gulp.src( options.css.file )
    .pipe( plugins.plumber() )
    .pipe( plugins.cssmin( { advanced: false } ) )
    .pipe( plugins.rename( { suffix: '.min' } ) )
    .pipe( gulp.dest( options.build.destination ) );

} );

// -------------------------------------
//   Task: Minify: JS
// -------------------------------------

gulp.task( 'minify:js', function () {

  gulp.src( options.js.file )
    .pipe( plugins.plumber() )
    .pipe( plugins.uglify() )
    .pipe( plugins.rename( { suffix: '.min' } ) )
    .pipe( gulp.dest( options.build.destination ) );

} );

// -------------------------------------
//   Task: Test: CSS
// -------------------------------------

gulp.task( 'test:css', function() {

  gulp.src( options.css.file )
    .pipe( plugins.plumber() )
    .pipe( plugins.parker() )

  gulp.src( options.css.file )
    .pipe( plugins.plumber() )
    .pipe( plugins.csscss() )

});

// -------------------------------------
//   Task: Test: JS
// -------------------------------------

gulp.task( 'test:js', function() {

  gulp.src( options.js.file )
    .pipe( plugins.plumber() )
    .pipe( plugins.jshint() )
    .pipe( plugins.jshint.reporter( 'default' ) )

});
