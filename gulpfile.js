/* 'use strict'; */

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify-es').default,
    rollup = require('gulp-better-rollup'),
    babel = require('rollup-plugin-babel'),
    sourcemaps = require('gulp-sourcemaps'),
    cssmin = require('gulp-cssmin'),
    browserSync = require('browser-sync').create(),
    del = require('del');


gulp.task('clean', gulp.series(function(done) {
    return del(['public/build'], done);
}));


gulp.task('js', function() {
	return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js', 'public/tools/moment.js'])
		.pipe(gulp.dest("public/build/tools"));
})

gulp.task('fonts', function() {
    return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('public/build/fonts'));
});

gulp.task('fa', function() {
<<<<<<< HEAD
	return gulp.src('node_modules/font-awesome/css/font-awesome.min.css', 'node_modules/bootstrap/dist/css/bootstrap.min.css')
=======
	return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
		.pipe(gulp.dest('public/build/vendor'));
});

gulp.task('bootstrap', function() {
	return gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
>>>>>>> dev
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

function compileMoment(compile) {
    gulp.task(compile, function() {
        return gulp.src(['public/vendor/moment.js'])
        .pipe(rollup({plugins: [babel()]}, 'iife'))
        .pipe(gulp.dest('public/build/vendor'))
        .pipe(concat('moment.min.js'))
        .pipe(uglify());
    })
} 

gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: 'public'
        },
        options: {
            browser: "google chrome"
        }
    });
});

gulp.task('watch', function() {
    gulp.watch('public/js/app.js',gulp.series('scripts'));
    gulp.watch('public/css/*.css',gulp.series('css'));
    gulp.watch(['public/*.html', 'public/css/*.css', 'public/js/**/*.js']).on('change', browserSync.reload);
});

gulp.task('default', gulp.series(
    gulp.parallel('js', 'css', 'scripts', 'fonts', 'fa', 'bootstrap', 'browser-sync'),
    gulp.parallel('watch' )
));
