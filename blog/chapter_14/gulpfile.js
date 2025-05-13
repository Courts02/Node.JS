"use strict";

// Load plugins
const autoprefixer = require("gulp-autoprefixer"); // Adds vendor prefixes to CSS rules
const browsersync = require("browser-sync").create(); // Live-reloading development server
const cleanCSS = require("gulp-clean-css"); // Minifies CSS
const del = require("del"); // Deletes files/folders
const gulp = require("gulp"); // Gulp core module
const header = require("gulp-header"); // Adds a banner/header to files
const merge = require("merge-stream"); // Merges multiple streams into one
const plumber = require("gulp-plumber"); // Prevents pipe breaking on error
const rename = require("gulp-rename"); // Renames files
const sass = require("gulp-sass"); // Sass compiler
const uglify = require("gulp-uglify"); // Minifies JavaScript

// Load package.json for banner
const pkg = require('./package.json'); // Import the package.json for project info

// Set the banner content (license and project info)
const banner = ['/*!\n',
  ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license %> (https://github.com/StartBootstrap/<%= pkg.name %>/blob/master/LICENSE)\n',
  ' */\n',
  '\n'
].join('');

// BrowserSync task: Initialize live-reload server
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./" // Serve files from the root directory
    },
    port: 3000 // Use port 3000 for the dev server
  });
  done();
}

// BrowserSync reload task: Reloads the browser when files change
function browserSyncReload(done) {
  browsersync.reload(); // Reload the browser
  done();
}

// Clean vendor task: Deletes the vendor folder
function clean() {
  return del(["./vendor/"]); // Remove the vendor directory
}

// Bring third-party dependencies from node_modules into vendor directory
function modules() {
  // Bootstrap
  var bootstrap = gulp.src('./node_modules/bootstrap/dist/**/*')
    .pipe(gulp.dest('./vendor/bootstrap')); // Copy Bootstrap files to the vendor folder
  // Font Awesome CSS
  var fontAwesomeCSS = gulp.src('./node_modules/@fortawesome/fontawesome-free/css/**/*')
    .pipe(gulp.dest('./vendor/fontawesome-free/css')); // Copy Font Awesome CSS
  // Font Awesome Webfonts
  var fontAwesomeWebfonts = gulp.src('./node_modules/@fortawesome/fontawesome-free/webfonts/**/*')
    .pipe(gulp.dest('./vendor/fontawesome-free/webfonts')); // Copy Font Awesome Webfonts
  // jQuery
  var jquery = gulp.src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js' // Exclude core.js from jQuery
    ])
    .pipe(gulp.dest('./vendor/jquery')); // Copy jQuery files
  return merge(bootstrap, fontAwesomeCSS, fontAwesomeWebfonts, jquery); // Merge all streams
}

// CSS task: Compile Sass to CSS, autoprefix, minify, and add banner
function css() {
  return gulp
    .src("./scss/**/*.scss") // Source Sass files
    .pipe(plumber()) // Prevent pipe from breaking on error
    .pipe(sass({
      outputStyle: "expanded", // Expanded CSS format
      includePaths: "./node_modules", // Include node_modules for Sass imports
    }))
    .on("error", sass.logError) // Log Sass compilation errors
    .pipe(autoprefixer({
      cascade: false // Don't create a cascading effect for prefixes
    }))
    .pipe(header(banner, { pkg: pkg })) // Add banner to CSS files
    .pipe(gulp.dest("./css")) // Save compiled CSS
    .pipe(rename({
      suffix: ".min" // Add .min suffix to the minified CSS file
    }))
    .pipe(cleanCSS()) // Minify CSS
    .pipe(gulp.dest("./css")) // Save minified CSS
    .pipe(browsersync.stream()); // Inject styles into the browser without reloading
}

// JS task: Minify JavaScript, add banner, and rename
function js() {
  return gulp
    .src([
      './js/*.js', // Source JavaScript files
      '!./js/*.min.js', // Exclude already minified files
      '!./js/contact_me.js', // Exclude specific files
      '!./js/jqBootstrapValidation.js' // Exclude specific files
    ])
    .pipe(uglify()) // Minify JavaScript
    .pipe(header(banner, { pkg: pkg })) // Add banner to JS files
    .pipe(rename({
      suffix: '.min' // Add .min suffix to the minified JS file
    }))
    .pipe(gulp.dest('./js')) // Save minified JavaScript
    .pipe(browsersync.stream()); // Inject scripts into the browser without reloading
}

// Watch files task: Watches for changes in files and triggers appropriate tasks
function watchFiles() {
  gulp.watch("./scss/**/*", css); // Watch Sass files and run the CSS task
  gulp.watch(["./js/**/*", "!./js/**/*.min.js"], js); // Watch JavaScript files and run the JS task
  gulp.watch("./**/*.html", browserSyncReload); // Watch HTML files and reload the browser
}

// Define complex tasks
const vendor = gulp.series(clean, modules); // Clean vendor directory and bring in modules
const build = gulp.series(vendor, gulp.parallel(css, js)); // Run vendor task, then parallel CSS and JS tasks
const watch = gulp.series(build, gulp.parallel(watchFiles, browserSync)); // Run build task and watch files for changes

// Export tasks so they can be run from the command line
exports.css = css; // Export the CSS task
exports.js = js; // Export the JS task
exports.clean = clean; // Export the clean task
exports.vendor = vendor; // Export the vendor task
exports.build = build; // Export the build task
exports.watch = watch; // Export the watch task
exports.default = build; // Set the default task to build
