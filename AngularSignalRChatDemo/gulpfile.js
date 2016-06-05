/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

/// <binding Clean='clean' />

"use strict";

var debug = process.env.NODE_ENV !== "production";

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    mainBowerFiles = require("gulp-main-bower-files"),
    gutil = require("gulp-util"),
    gulpFilter = require("gulp-filter"),
    rename = require("gulp-rename"),
    webpack = require("webpack"),
    webpackStream = require("webpack-stream"),
    webpackConfig = require("./webpack.config.js");

if (debug) {
  webpackConfig.devtool = "#inline-source-map";
  webpackConfig.pathinfo = true;
  webpackConfig.debug = true;
} else {
  webpackConfig.plugins = [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
  ];
}

var paths = {
  clientAppFolder: "Scripts/app/",
  contentFolder: "Content/",
  webRootFolder: "wwwroot/",
  webRootLibFolder: "wwwroot/lib/",
  webRootJsFolder: "wwwroot/js/",
  webRootCssFolder: "wwwroot/css/"

};

var globs = {
  js: "**/*.js",
  minJs: "**/*.min.js",
  css: "**/*.css",
  minCss: "**/*.min.css",
};

var outputFileNames = {
  siteJs: "site.min.js",
  siteCss: "site.min.css"
};

var statusHandler = function (title, callback) {
  return function (err, stats) {
    if (err) {
      throw new gutil.PluginError(title, err);
    }

    gutil.log("[" + title + "]", stats.toString({
      colors: true,
      progress: true
    }));

    callback();
  };
};

gulp.task("clean:js", function (cb) {
  rimraf(paths.webRootJsFolder, cb);
});

gulp.task("clean:css", function (cb) {
  rimraf(paths.webRootCssFolder, cb);
});

gulp.task("clean:weblib", function (cb) {
  rimraf(paths.webRootLibFolder, cb);
});

gulp.task("min:css", function () {
  return gulp.src([
    paths.contentFolder + globs.css, "!" + paths.contentFolder + globs.minCss,
    paths.clientAppFolder + globs.css, "!" + paths.clientAppFolder + globs.minCss
  ])
    .pipe(concat(outputFileNames.siteCss))
    .pipe(cssmin())
    .pipe(gulp.dest(paths.webRootCssFolder));
});

gulp.task("min:bower", function (cb) {
  var filterJS = gulpFilter(globs.js, { restore: true });

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
      .pipe(uglify().on("error", statusHandler("Uglify", cb)))
      .pipe(rename({ suffix: ".min" }))
      .pipe(filterJS.restore)
      .pipe(gulp.dest(paths.webRootLibFolder));
});

gulp.task("webpack:bundleAppJs", function (cb) {
  return gulp.src([paths.clientAppFolder + globs.js, "!" + paths.clientAppFolder + globs.minJs], { base: paths.clientAppFolder })
    .pipe(webpackStream(webpackConfig), statusHandler("Webpack", cb))
    .pipe(concat(outputFileNames.siteJs))
    .pipe(gulp.dest(paths.webRootJsFolder));
});

gulp.task("clean", ["clean:js", "clean:css", "clean:weblib"]);

gulp.task("build", ["min:css", "min:bower", "webpack:bundleAppJs"]);

gulp.task("default", ["build"]);
