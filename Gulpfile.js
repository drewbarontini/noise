// *************************************
//
//   Gulpfile
//
// *************************************
//
// Available tasks:
//   `gulp`
//   `gulp build`
//   `gulp coffee`
//   `gulp lint`
//   `gulp sass`
//   `gulp test-css`
//   `gulp test-js`
//   `gulp uglify`
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
// gulp-load-plugins : Automatically load Gulp plugins
// gulp-minify-css   : Minify CSS
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

  watch : {
    run : function() {
      return [ options.coffee.files, options.sass.files ];
    },
    tasks : [ 'sass', 'coffee', 'minify-css', 'build' ]
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

gulp.task( 'coffee', function() {

  gulp.src( options.coffee.files )
    .pipe( plugins.plumber() )
    .pipe( plugins.coffee( { bare: true } ) )
    .pipe( gulp.dest( options.coffee.destination ) );

} );

// -------------------------------------
//   Task: Lint
// -------------------------------------

gulp.task( 'lint', function () {

  gulp.src( options.coffee.files )
      .pipe( plugins.plumber() )
      .pipe( plugins.coffeelint() )
      .pipe( plugins.coffeelint.reporter() )

} );

// -------------------------------------
//   Task: Minify CSS
// -------------------------------------


gulp.task( 'minify-css', function () {

  gulp.src( options.css.file )
      .pipe( plugins.plumber() )
      .pipe( plugins.cssmin() )
      .pipe( plugins.rename( { suffix: '.min' } ) )
      .pipe( gulp.dest( options.build.destination ) );

} );

// -------------------------------------
//   Task: Sass
// -------------------------------------

gulp.task( 'sass', function () {

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
//   Task: Test CSS
// -------------------------------------

gulp.task( 'test-css', function() {

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

gulp.task( 'test-js', function() {

  gulp.src( options.js.file )
    .pipe( plugins.plumber() )
    .pipe( plugins.jshint() )
    .pipe( plugins.jshint.reporter( 'default' ) )

});

// -------------------------------------
//   Task: Uglify
// -------------------------------------

gulp.task( 'uglify', function () {

  gulp.src( options.js.file )
      .pipe( plugins.plumber() )
      .pipe( plugins.uglify() )
      .pipe( plugins.rename( { suffix: '.min' } ) )
      .pipe( gulp.dest( options.build.destination ) );

} );
