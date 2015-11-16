'use strict';

var gulp = require('gulp'),
    notify = require('gulp-notify'),
    jshint = require('gulp-jshint'),
    jscs = require('gulp-jscs'),
    mocha = require('gulp-mocha');

var jsPaths = ['./**/*.js'];

gulp.task('jsStyle', function () {
  return gulp.src(jsPaths)
    .pipe(jscs())
    .pipe(notify({
      title: 'JSCS',
      message: 'JSCS Passed'
    }));
});

gulp.task('jsLint', function () {
  return gulp.src(jsPaths)
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'))
  .pipe(jshint.reporter('fail'))
  .pipe(notify({
    title: 'JSHint',
    message: 'JSHint Passed'
  }));
});

gulp.task('test', function () {
  return gulp.src('test/test.js', { read: false }).pipe(mocha());
});

gulp.task('default', ['jsLint', 'jsStyle']);
// gulp.watch('src/*.js', ['default']);
