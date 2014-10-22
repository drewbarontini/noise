gulp       = require("gulp")
coffee     = require("gulp-coffee")
gutil      = require("gulp-util")
watch      = require("gulp-watch")
es         = require("event-stream")
coffeelint = require("gulp-coffeelint")

srcFiles  = "components/*.coffee"
specFiles = "spec/*.coffee"

gulp.task "default", ->
  watch [
    srcFiles
    specFiles
  ], (files) ->
    gulp.start "coffee"

gulp.task "coffee", ->
  components = gulp.src(srcFiles).pipe( coffee(bare: true).on("error", gutil.log) ).pipe( gulp.dest("components/js/") )
  tests = gulp.src(specFiles).pipe( coffee(bare: true).on("error", gutil.log) ).pipe( gulp.dest("spec/javascripts/") )
  es.concat components, tests

gulp.task "lint", ->
  gulp.src(srcFiles).pipe(coffeelint()).pipe coffeelint.reporter()
