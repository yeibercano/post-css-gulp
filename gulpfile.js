
var gulp = require('gulp');
var webserver = require('gulp-webserver');
var gutil = require('gulp-util');

var livereload = require('gulp-livereload');
var postcss = require('gulp-postcss');
var precss = require('precss');
var doiuse = require('doiuse');
var immutableCss = require('immutable-css');
var stylelint = require('stylelint');
var reporter = require('postcss-reporter');
var cssstats = require('postcss-cssstats');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var cssnext = require('postcss-cssnext');
var shortcss = require('postcss-short');
var rebecca = require('postcss-color-rebeccapurple');

var src = './styles/';

gulp.task('html', function () {
   gulp.src('index.html')
    .pipe(sourcemaps.init())
     .on('error', gutil.log)
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dest'));

});

gulp.task('images', function() {
 gulp.src('./img/*')
    .pipe(gulp.dest('./dest/img'));

});

gulp.task('css', function () {
    return gulp.src(src + 'styles.css') 
    // if you want to create separate files replace above line with return gulp.src(src + '*')
    .pipe(sourcemaps.init())
    .pipe(postcss([
      precss(),
      // doiuse({
      //   browsers: ['ie >= 9', 'last 2 versions'],
      // }),
      shortcss(),
      // rebecca(),
      // autoprefixer({ 
      //   browsers: ['last 5 versions'] }),
      cssnext(),
      // immutableCss({
      //   strict: true
      // }),
      // stylelint(),
      // reporter(),
      // cssstats(
      //   function(stats) {
      //     console.log(stats);
      //   }
      // )
    ]))
    .on('error', gutil.log)
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dest/styles'));
});

gulp.task('watch', function () {
     gulp.watch('styles/*.css', ['css']);
     gulp.watch('*.html', ['html']);
});

gulp.task('webserver', function () {
     gulp.src('./dest/')
     .pipe(webserver({
        livereload: true,
        open:true
     }));
});

gulp.task('default', ['html','images', 'css', 'webserver','watch']);


        
