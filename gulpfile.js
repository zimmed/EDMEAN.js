'use strict';

var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    notify = require("gulp-notify"),
    bower = require('gulp-bower'),
    config = require('./config/config');

var sassDir = './app/styles', bowerDir = './public/lib';

gulp.task('serve', function () {
    require('./server');
});

gulp.task('bower', function () {
    return bower().pipe(gulp.dest(bowerDir));
});

gulp.task('icons', function () {
    return gulp.src(bowerDir + '/fontawesome/fonts/**.*').pipe(gulp.dest(config.resourcePath('font')));
});

gulp.task('css', function () {
    return sass(sassDir + '/main.sass', {
        style: 'compressed',
        loadPath: [
            sassDir,
            bowerDir + '/bootstrap-sass-official/assets/stylesheets',
            bowerDir + '/fontawesome/scss',
        ]
    }).on("error", notify.onError(function (error) {
        return "Error: " + error.message;
    })).pipe(gulp.dest(config.resourcePath('style')));
});

gulp.task('build', ['bower', 'icons', 'css']);

gulp.task('default', ['build', 'serve']);
