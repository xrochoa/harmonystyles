'use strict';

// GULP
var gulp = require('gulp');

// PLUGINS
//img
var imagemin = require('gulp-imagemin');

//html
var minifyHtml = require('gulp-minify-html');

//css
var sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css');

//js
var jshint = require('gulp-jshint'),
    browserify = require('browserify'),
    uglify = require('gulp-uglify');

//utils
var usemin = require('gulp-usemin'),
    del = require('del'),
    runSequence = require('run-sequence'),
    source = require('vinyl-source-stream'),
    streamify = require('gulp-streamify'),
    glob = require('glob');


//server
var nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload');

/*
CLEAN
*/

//Clean folders before tasks
gulp.task('clean', function() {
    return del(['dist/*']);
});

/*
RESOURCES
*/

//Copy files from resources
gulp.task('res', function() {
    return gulp.src('src/assets/res/**/*')
        .pipe(gulp.dest('dist/assets/res'));
});

/*
MINIFY HTML AND JS LIBRARIES
*/

gulp.task('usemin', function() {
    return gulp.src('src/**/*.html')
        .pipe(usemin({
            html: [
                function() {
                    return minifyHtml({ empty: true });
                }
            ],
            lib: [
                uglify
            ]
        }))
        .pipe(gulp.dest('dist'))
        .pipe(livereload());

});

/*
IMAGES
*/

//Minify png, jpg, gif and svg images
gulp.task('img', function() {
    return gulp.src('src/assets/img/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }]
        }))
        .pipe(gulp.dest('dist/assets/img'));
});

/*
CUSTOM JAVASCRIPT
*/

//Lint Javascript
gulp.task('lint', function() {
    return gulp.src('src/assets/app/**/*.js')
        .pipe(jshint({
            "browserify": true
        }))
        .pipe(jshint.reporter('default'));
});

//Browserify and Minify Javascript Bundles
gulp.task('js', function() {

    glob('src/assets/app/**/app.js', function(err, files) {

        files.map(function(entry) {

            return browserify({ entries: [entry] })
                .bundle()
                .pipe(source(entry.replace('src/assets/app/', '')))
                .pipe(gulp.dest('src/assets/js'))
                .pipe(streamify(uglify()))
                .pipe(gulp.dest('dist/assets/js'))
                .pipe(livereload());

        });
    });

});

/*
CSS
*/

//Compile Sass to CSS and Minify
gulp.task('css', function() {
    return gulp.src('src/assets/scss/**/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/assets/css'))
        .pipe(autoprefixer({
            browsers: [
                "Android 2.3",
                "Android >= 4",
                "Chrome >= 20",
                "Firefox >= 24",
                "Explorer >= 8",
                "iOS >= 6",
                "Opera >= 12",
                "Safari >= 6"
            ],
            cascade: false
        }))
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(livereload());

});

/*
SERVER - WATCH - DEFAULT
*/

//Node server start
gulp.task('server', function() {
    nodemon({
        script: 'server.js'
    });
});

//Watches Files For Changes
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('src/assets/res/**/*', ['res']);
    gulp.watch('src/assets/img/**/*', ['img']);
    gulp.watch('src/**/*.html', ['usemin']);
    gulp.watch('src/assets/scss/**/*.scss', ['css']);
    gulp.watch('src/assets/app/**/*.js', ['lint', 'js']);
});


// Default Task
gulp.task('default', function() {
    runSequence('clean', 'res', 'img', 'usemin', 'css', 'lint', 'js', 'watch', 'server');
});
