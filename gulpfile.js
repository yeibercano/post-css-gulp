
var gulp = require('gulp');
gulp.task('analyze-css', function () {
    var postcss = require('gulp-postcss');
    var doiuse = require('doiuse');
    var immutableCss = require('immutable-css');
    var stylelint = require('stylelint');
    var reporter = require('postcss-reporter');
    var cssstats = require('postcss-cssstats');
    var sourcemaps   = require('gulp-sourcemaps');
    var autoprefixer = require('autoprefixer');
    var cssnext = require('postcss-cssnext');
    var shortcss = require('postcss-short');

    return gulp.src('style.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([
      doiuse({
        browsers: ['ie >= 9', 'last 2 versions'],
      }),
      shortcss,
      cssnext,
      autoprefixer({ 
        browsers: ['last 5 versions'] }),
      immutableCss({
        strict: true
      }),
      stylelint(),
      reporter(),
      cssstats(
        function(stats) {
          console.log(stats);
        }
      )
    ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dest'));
});

        
