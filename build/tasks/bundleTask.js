var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var notify = require('gulp-notify');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var gutil = require('gulp-util');
var shell = require('gulp-shell');
var glob = require('glob');
var livereload = require('gulp-livereload');
var argv = require('yargs').argv;
var development = !(argv.ENV === "production");

var paths = require('../paths');

gulp.task('bundleTask', function() {
    var appBundler = browserify({
        entries: [paths.main], // The entry file, normally "main.js"
        transform: [reactify], // Convert JSX style
        debug: development, // Sourcemapping
        cache: {},
        packageCache: {},
        fullPaths: true // Requirement of watchify
    });

    var rebundle = function() {
        var start = Date.now();
        console.log('Building APP bundle');
        appBundler.bundle()
            .on('error', gutil.log)
            .pipe(source('bundle.js'))
            .pipe(gulpif(!development, streamify(uglify())))
            .pipe(gulp.dest(paths.output))
            .pipe(gulpif(development, livereload())) // It notifies livereload about a change if you use it
            .pipe(notify(function() {
                console.log('APP bundle built in ' + (Date.now() - start) + 'ms');
        }));
    };

    /* When we are developing we want to watch for changes and
        trigger a rebundle */
    if (development) {
        appBundler = watchify(appBundler);
        appBundler.on('update', rebundle);
        livereload.listen();
    }

    // And trigger the initial bundling
    rebundle();


    /* And now we have to create our third bundle, which are our external dependencies,
      or vendors. This is React JS, underscore, jQuery etc. We only do this when developing
      as our deployed code will be one file with all application files and vendors */
    var vendorsBundler = browserify({
        debug: true,
        require: ['react', 'react-router']
    });

    /* We only run the vendor bundler once, as we do not care about changes here,
      as there are none */
    var start = new Date();
    console.log('Building VENDORS bundle');
    vendorsBundler.bundle()
        .on('error', gutil.log)
        .pipe(source('vendors.js'))
        .pipe(gulpif(!development, streamify(uglify())))
        .pipe(gulp.dest(paths.output))
        .pipe(notify(function() {
            console.log('VENDORS bundle built in ' + (Date.now() - start) + 'ms');
        }));

});