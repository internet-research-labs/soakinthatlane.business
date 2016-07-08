var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
var browserify = require('gulp-browserify');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var concat = require('gulp-concat');
var sass = require('gulp-sass');

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
  return gulp.src('src/hax/main.js')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(browserify({
      insertGlobals : false
    }))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('hax/'))
});

gulp.task('head', function(){
  return gulp.src('src/hax/head.js')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(browserify({
      insertGlobals : false
    }))
    .pipe(concat('head.js'))
    .pipe(gulp.dest('hax/'))
});



gulp.task('default', function(){
  gulp.watch("src/swag/**/*.scss", ['swag']);
  gulp.watch("src/hax/**/*.js", ['hax', 'head']);
});

gulp.task('all', ['swag', 'hax', 'head']);