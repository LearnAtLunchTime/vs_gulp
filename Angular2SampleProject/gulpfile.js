/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var ngAnnotate = require('gulp-ng-annotate');
var notify = require('gulp-notify');
var uglify = require('gulp-uglify');
var ts = require('gulp-typescript');

var libraryConfig = {
    src: ['node_modules/angular2/bundles/angular2.js'
        , 'node_modules/angular2/bundles/router.js'
        , 'node_modules/bootstrap/dist/js/bootstrap.js'
    ],
    destPath: 'dist/libs',
}

var appConfig = {
    src: ['components/*.js'],
    destPath: 'dist/libs',
}

var destLibraryPath = 'dist/libs';
var destAppPath = 'dist/app';

gulp.task('clean', function () {
    return gulp.src(destLibraryPath)
        .pipe(clean())
        .pipe(gulp.dest(destAppPath))
        .pipe(clean());
});

gulp.task('libScripts', function () {
    return gulp.src(libraryConfig.src)
      .pipe(concat('libs.js'))
      .pipe(gulp.dest(destLibraryPath))
      .pipe(rename({ suffix: '.min' }))
      .pipe(ngAnnotate())
      .pipe(uglify())
      .pipe(gulp.dest(destLibraryPath))
      .pipe(notify({ message: 'Library Scripts task complete' }));
});

gulp.task('appScriptsTask', function () {
    return gulp.src(appConfig.src)
      .pipe(concat('app.js'))
      .pipe(gulp.dest(destAppPath))
      .pipe(rename({ suffix: '.min' }))
      .pipe(ngAnnotate())
      .pipe(uglify())
      .pipe(gulp.dest(destAppPath))
      .pipe(notify({ message: 'App Scripts task complete' }));
});

//gulp.task('copy:libs', ['clean'], function () {
//    return gulp.src([
//        'node_modules/angular2/bundles/angular2.dev.js',
//        'node_modules/angular2/bundles/router.dev.js',
//        'node_modules/angular2/bundles/angular2-polyfills.js',
//        'node_modules/rxjs/bundles/Rx.js'
//    ])
//      .pipe(gulp.dest('dist/lib'))
//});

gulp.task('default', ['clean', 'libScripts', 'appScriptsTask']);

gulp.task('watch', function () {
    gulp.watch(appConfig.src, ['appScriptsTask']);
});