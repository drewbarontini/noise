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
//   `gulp connect`
//   `gulp icons`
//   `gulp images`
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
// gulp-connect      : Gulp plugin to run a webserver (with LiveReload)
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

  // ----- Default ----- //

  default : {
    tasks : [ 'build', 'connect', 'watch' ]
  },

  // ----- Build ----- //

  build : {
    tasks       : [ 'minify:css', 'minify:js', 'html' ],
    destination : 'build/'
  },

  // ----- Coffee ----- //

  coffee : {
    files       : 'source/javascripts/src/*.coffee',
    file        : 'application.js',
    destination : 'source/javascripts'
  },

  // ----- Connect ----- //

  connect : {
    port : 9000,
    base : 'http://localhost',
    root : 'build'
  },

  // ----- CSS ----- //

  css : {
    files       : 'source/stylesheets/*.css',
    file        : 'source/stylesheets/application.css',
    destination : 'source/stylesheets'
  },

  // ----- HTML ----- //

  html : {
    files           : 'source/*.html',
    file            : 'source/index.html',
    destination     : 'build',
    destinationFile : 'build/index.html'
  },

  // ----- Icons ----- //

  icons : {
    files       : 'source/images/icons/icon-*.svg',
    destination : 'build/images/icons'
  },

  // ----- Images ----- //

  images : {
    files       : 'source/images',
    destination : 'build/images'
  },

  // ----- JavaScript ----- //

  js : {
    files       : 'source/javascripts/*.js',
    file        : 'source/javascripts/application.js',
    destination : 'source/javascripts'
  },

  // ----- Sass ----- //

  sass : {
    files       : 'source/stylesheets/*.sass',
    destination : 'source/stylesheets'
  },

  // ----- Watch ----- //

  watch : {
    files : function() {
      return [
        options.html.files,
        options.coffee.files,
        options.sass.files
      ]
    },
    run : function() {
      return [
        [ 'html', 'images' ],
        [ 'compile:coffee', 'minify:js' ],
        [ 'compile:sass', 'minify:css' ]
      ]
    }
  }

};

// -------------------------------------
//   Task: Default
// -------------------------------------

gulp.task( 'default', options.default.tasks );

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
//   Task: Connect
// -------------------------------------

gulp.task( 'connect', function() {

  plugins.connect.server( {
    root       : [ options.connect.root ],
    port       : options.connect.port,
    base       : options.connect.base,
    livereload : true
  } );

});

// -------------------------------------
//   Task: HTML
// -------------------------------------

gulp.task( 'html', function() {

  gulp.src( options.html.files )
    .pipe( gulp.dest( options.html.destination ) )
    .pipe( plugins.connect.reload() );

});

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
//   Task: Images
// -------------------------------------

gulp.task( 'images', function() {

  gulp.src( options.images.files )
    .pipe( gulp.dest( options.images.destination ) )
    .pipe( plugins.connect.reload() );

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
    .pipe( gulp.dest( options.build.destination ) )
    .pipe( plugins.connect.reload() );

} );

// -------------------------------------
//   Task: Minify: JS
// -------------------------------------

gulp.task( 'minify:js', function () {

  gulp.src( options.js.file )
    .pipe( plugins.plumber() )
    .pipe( plugins.uglify() )
    .pipe( plugins.rename( { suffix: '.min' } ) )
    .pipe( gulp.dest( options.build.destination ) )
    .pipe( plugins.connect.reload() );

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

// -------------------------------------
//   Task: Watch
// -------------------------------------

gulp.task( 'watch', function() {

  var watchFiles = options.watch.files();

  watchFiles.forEach( function( files, index ) {
    gulp.watch( files, options.watch.run()[ index ]  );
  } );

});
