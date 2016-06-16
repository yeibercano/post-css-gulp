var gulp = require('gulp');
gulp.task('analyze-css', function () {
  var postcss = require('gulp-postcss');
  var reporter = require('postcss-reporter');

  return gulp.src('style.css')
    .pipe(postcss([ 
      reporter()
    ]));
});