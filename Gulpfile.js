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
//   `gulp lint:coffee`
//   `gulp minify:css`
//   `gulp minify:js`
//   `gulp test:css`
//   `gulp test:js`
//
// *************************************

// -------------------------------------
//   Modules
// -------------------------------------
//
// gulp              : The streaming build system
// gulp-autoprefixer : Prefix CSS
// gulp-coffee       : Compile CoffeeScript files
// gulp-coffeelint   : Lint your CoffeeScript
// gulp-csscss       : CSS redundancy analyzer
// gulp-jshint       : JavaScript code quality tool
// gulp-load-plugins : Automatically load Gulp plugins
// gulp-minify-css   : Minify CSS
// gulp-parker       : Stylesheet analysis tool
// gulp-plumber      : Prevent pipe breaking from errors
// gulp-rename       : Rename files
// gulp-sass         : Compile Sass
// gulp-uglify       : Minify JavaScript with UglifyJS
// gulp-util         : Utility functions
// gulp-watch        : Watch stream
//
// -------------------------------------

var gulp    = require( 'gulp' );
var plugins = require( 'gulp-load-plugins' )( {

  rename : {
    'gulp-minify-css': 'cssmin'
  }

} );

// -------------------------------------
//   Options
// -------------------------------------

var options = {

  build : {
    tasks       : [ 'minify:css', 'minify:js' ],
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

  watch : {
    run : function() {
      return [ options.coffee.files, options.sass.files ];
    },
    tasks : [ 'compile:sass', 'compile:coffee', 'minify:css', 'build' ]
  }

};

// -------------------------------------
//   Task: Default
// -------------------------------------

gulp.task( 'default', function() {

  plugins.watch( options.watch.run(), function( files ) {

    options.watch.tasks.forEach( function( task ) {
      gulp.start( task );
    } );

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

gulp.task( 'compile:coffee', function() {

  gulp.src( options.coffee.files )
    .pipe( plugins.plumber() )
    .pipe( plugins.coffee( { bare: true } ) )
    .pipe( gulp.dest( options.coffee.destination ) );

} );

// -------------------------------------
//   Task: Sass
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
//   Task: Lint
// -------------------------------------

gulp.task( 'lint:coffee', function () {

  gulp.src( options.coffee.files )
      .pipe( plugins.plumber() )
      .pipe( plugins.coffeelint() )
      .pipe( plugins.coffeelint.reporter() )

} );

// -------------------------------------
//   Task: Minify CSS
// -------------------------------------

gulp.task( 'minify:css', function () {

  gulp.src( options.css.file )
      .pipe( plugins.plumber() )
      .pipe( plugins.cssmin( { advanced: true } ) )
      .pipe( plugins.rename( { suffix: '.min' } ) )
      .pipe( gulp.dest( options.build.destination ) );

} );

// -------------------------------------
//   Task: Minify JS
// -------------------------------------

gulp.task( 'minify:js', function () {

  gulp.src( options.js.file )
      .pipe( plugins.plumber() )
      .pipe( plugins.uglify() )
      .pipe( plugins.rename( { suffix: '.min' } ) )
      .pipe( gulp.dest( options.build.destination ) );

} );

// -------------------------------------
//   Task: Test CSS
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
//   Task: Test JS
// -------------------------------------

gulp.task( 'test:js', function() {

  gulp.src( options.js.file )
    .pipe( plugins.plumber() )
    .pipe( plugins.jshint() )
    .pipe( plugins.jshint.reporter( 'default' ) )

});
