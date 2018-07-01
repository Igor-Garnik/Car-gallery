/* 'use strict'; */

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify-es').default,
    rollup = require('gulp-better-rollup'),
    babel = require('rollup-plugin-babel'),
    sourcemaps = require('gulp-sourcemaps'),
    cssmin = require('gulp-cssmin'),
    browserSync = require('browser-sync');

const server = browserSync.create();

gulp.task('js', function() {
	return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js', 'node_modules/moment/min/moment.min.js'])
		.pipe(gulp.dest("public/build/tools"));
})

gulp.task('fonts', function() {
    return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('public/build/fonts'));
});

gulp.task('fa', function() {
	return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
		.pipe(gulp.dest('public/build/vendor'));
});

gulp.task('bootstrap', function() {
	return gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
		.pipe(gulp.dest('public/build/vendor'));
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

function reload(done) {
    server.reload();
    done();
}

function serve(done) {
    server.init({
        server: {
            baseDir: './public'
        }
    });
    done();
}

gulp.task('watch-build', function() {
    gulp.watch('public/js/**/*.js', gulp.series('scripts'));
    gulp.watch('public/css/*.css', gulp.series('css'));
    gulp.watch(['public/build/**/*', 'public/**/*.html'], gulp.series(reload));
});

gulp.task('default', gulp.series('js', 'css', 'scripts', 'fonts', 'fa', 'bootstrap', serve));

gulp.task('watch', gulp.series('default', 'watch-build'));

