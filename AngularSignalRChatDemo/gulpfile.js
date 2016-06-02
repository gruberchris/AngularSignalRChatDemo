/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

/// <binding Clean='clean' />

"use strict";

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    eslint = require("gulp-eslint"),
    sourcemaps = require("gulp-sourcemaps"),
    mainBowerFiles = require("gulp-main-bower-files"),
    gutil = require("gulp-util"),
    gulpFilter = require("gulp-filter"),
    rename = require("gulp-rename"),
    webpack = require("webpack-stream");

var webroot = "./wwwroot/",
    clientroot = "./Scripts/app/",
    sitecontent = "./Content/"

var paths = {
  js: clientroot + "**/*.js",
  minJs: clientroot + "**/*.min.js",
  css: clientroot + "**/*.css",
  minCss: clientroot + "**/*.min.css",
  sitecontentCss: sitecontent + "**/*.css",
  sitecontentMinCss: sitecontent + "**/*.min.css",
  concatJsDest: webroot + "js/site.min.js",
  concatCssDest: webroot + "css/site.min.css",
  weblib: webroot + "lib/"
};

var errrorHandler = function (title) {
  'use strict';

  return function (err) {
    gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
    this.emit('end');
  };
}

gulp.task("lint", function () {
  return gulp.src(paths.js)
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
});

gulp.task("clean:js", function (cb) {
  rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
  rimraf(paths.concatCssDest, cb);
});

gulp.task("clean:weblib", function (cb) {
  rimraf(paths.weblib, cb);
});

gulp.task("clean", ["clean:js", "clean:css", "clean:weblib"]);

gulp.task("min:js", function () {
  return gulp.src([paths.js, "!" + paths.minJs], { base: "." })
      .pipe(sourcemaps.init())
      //.pipe(babel())
      .pipe(webpack({
        module: {
          loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loaders: ["ng-annotate", "babel-loader?presets[]=es2015"]
          }]
        },
        output: { filename: "index.module.js" }
      }))
      .pipe(concat(paths.concatJsDest))
      .pipe(uglify().on("error", errrorHandler("Uglify")))
      .pipe(sourcemaps.write("."))
      
      .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
  return gulp.src([paths.sitecontentCss, "!" + paths.sitecontentMinCss, paths.css, "!" + paths.minCss])
      .pipe(concat(paths.concatCssDest))
      .pipe(cssmin())
      .pipe(gulp.dest("."));
});

gulp.task("main-bower-files", function () {
  var filterJS = gulpFilter('**/*.js', { restore: true });

  return gulp.src("./bower.json")
      .pipe(mainBowerFiles({
        overrides: {
          bootstrap: {
            main: [
                './dist/js/bootstrap.js',
                './dist/css/*.min.*',
                './dist/fonts/*.*'
            ]
          }
        }
      }))
      .pipe(filterJS)
      .pipe(uglify().on("error", errrorHandler("Uglify")))
      .pipe(rename({
        suffix: ".min"
      }))
      .pipe(filterJS.restore)
      .pipe(gulp.dest(paths.weblib));
});

gulp.task("min", ["lint", "min:js", "min:css", "main-bower-files"]);

gulp.task("default", function () {
  gulp.run("min");
});