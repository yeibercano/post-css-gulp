
var gulp = require('gulp');
var webserver = require('gulp-webserver');
var gutil = require('gulp-util');

var livereload = require('gulp-livereload');
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
var rebeca = require('postcss-color-rebeccapurple');


gulp.task('html', function () {
     gulp.src('index.html')
      .pipe(sourcemaps.init())
       .on('error', gutil.log)
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./dest'));

});

// Images
gulp.task('images', function() {
 gulp.src('./img/*')
      .pipe(gulp.dest('./dest/img'));

});

gulp.task('css', function () {

    return gulp.src('style.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([
      doiuse({
        browsers: ['ie >= 9', 'last 2 versions'],
      }),
      shortcss,
      // cssnext,
      rebeca,
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
    .on('error', gutil.log)
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dest'));
});

gulp.task('watch', function () {
     gulp.watch('./style.css', ['css']);
     gulp.watch('./index.html', ['html']);
});

gulp.task('webserver', function () {
     gulp.src('./dest/')
     .pipe(webserver({
        livereload: true,
        open:true
     }));
});

gulp.task('default', ['html','images', 'css', 'webserver','watch']);


        
