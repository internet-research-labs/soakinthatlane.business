var gulp = require('gulp');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var webpack = require('webpack-stream');
var named = require('vinyl-named');

gulp.task('swag', function(){
  gulp.src(['src/swag/swag.scss'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sass())
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
    .pipe(gulp.dest('swag/'))
});

gulp.task('hax', function(){
  return gulp.src(['src/hax/main.js', 'src/hax/head.js'])
    .pipe(named())
    .pipe(webpack())
    .pipe(gulp.dest('hax/'))
});

gulp.task('default', function(){
  gulp.watch("src/swag/**/*.scss", ['swag']);
  gulp.watch("src/hax/**/*.js", ['hax']);
});

gulp.task('all', ['swag', 'hax']);