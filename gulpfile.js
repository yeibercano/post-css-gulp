var gulp = require('gulp');
gulp.task('analyze-css', function () {
  var postcss = require('gulp-postcss');
  var stylelint = require('stylelint');
  var reporter = require('postcss-reporter');
  var doiuse = require('doiuse');

  return gulp.src('style.css')
    .pipe(postcss([
      doiuse({
        browsers: ['ie >= 9', 'last 2 versions'],
      }),
      stylelint(), 
      reporter()
    ]));
});


// return gulp.src('style.css')
//   .pipe(postcss([
//     reporter()
// ]));