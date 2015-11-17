'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    jscs = require('gulp-jscs'),
    mocha = require('gulp-mocha');

var jsPaths = ['models/*.js', './*.js'];

gulp.task('jsStyle', function() {
  return gulp.src(jsPaths)
    .pipe(jscs())
    .pipe(jscs.reporter());
});

gulp.task('jsLint', function() {
  return gulp.src(jsPaths)
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .pipe(jshint.reporter('fail'));
});

gulp.task('test', function() {
  return gulp.src('test/test.js', { read: false }).pipe(mocha());
});

gulp.task('default', ['jsLint', 'jsStyle']);

