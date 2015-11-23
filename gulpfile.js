var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var mocha = require('gulp-mocha');

var jsPaths = ['./*.js', 'models/*.js', 'public/javascripts/*.js', 'routes/*.js', 'test/*.js'];

gulp.task('jsLint', function() {
  return gulp.src(jsPaths)
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .pipe(jshint.reporter('fail'));
});

gulp.task('jsStyle', function() {
  return gulp.src(jsPaths)
    .pipe(jscs())
    .pipe(jscs.reporter());
});

gulp.task('test', function() {
  return gulp.src('test/*.js', { read: false })
    .pipe(mocha());
});

gulp.task('default', ['jsLint', 'jsStyle']);
