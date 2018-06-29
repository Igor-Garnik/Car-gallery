/* 'use strict'; */

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify-es').default,
    rollup = require('gulp-better-rollup'),
    babel = require('rollup-plugin-babel'),
    sourcemaps = require('gulp-sourcemaps'),
    cssmin = require('gulp-cssmin'),
    browserSync = require('browser-sync').create();
    var browserSyncOptions = {
        browser: "google chrome",
        proxy: "localhost:3000",
        notify: false
    };

gulp.task('js', function() {
	return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
		.pipe(gulp.dest("public/build/tools"));
})

gulp.task('fonts', function() {
    return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('public/build/fonts'));
});

gulp.task('fa', function() {
	return gulp.src('node_modules/font-awesome/css/font-awesome.min.css', 'node_modules/bootstrap/dist/css/bootstrap.min.css')
		.pipe(gulp.dest('puclic/build/vendor'));
});

gulp.task('css', function() {
    return gulp.src('public/css/*.css')
        .pipe(concat('main.min.css'))
        .pipe(sourcemaps.init())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/build/css'))
});

gulp.task('scripts', function() {
    return gulp.src(['public/js/app.js'])
        .pipe(sourcemaps.init())
        .pipe(rollup({plugins: [babel()]}, 'iife'))
        .pipe(concat('app.min.js'))
        // .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/build/js'))
});

gulp.task('serve', function() {
	browserSync.init({
		server: {
			baseDir: 'public'
        },
        options: {
            browser: "google chrome"
        }
    });
    browserSync.watch('public',browserSync.reload)
});

gulp.task('watch', function() {
    gulp.watch('public/js/app.js',gulp.series('scripts'));
    gulp.watch('public/css/*.css',gulp.series('css'));
});

gulp.task('default', gulp.series(
    gulp.parallel('js', 'css', 'scripts', 'fonts', 'fa'),
    gulp.parallel('watch', 'serve')
));
