const gulp = require('gulp');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify-es').default;
let rollup = require('gulp-better-rollup');
let babel = require('rollup-plugin-babel');
let sourcemaps = require('gulp-sourcemaps');
let cssmin = require('gulp-cssmin');
let del = require('del');
let browserSync = require('browser-sync').create();

let paths = {
    vendor: ['src/js/tools/*.js'],
    styles: ['src/css/*.css'],
    fonts: ['src/fonts/*.*'],
    img: ['src/img/*.*']
};

gulp.task('clean', function() {
    return del(['build']);
});

gulp.task('css', function() {
    return gulp.src(paths.styles)
        .pipe(concat('main.min.css'))
        .pipe(sourcemaps.init())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/build/css'))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
    return gulp.src('public/js/app.js')
        .pipe(sourcemaps.init())
        .pipe(rollup({plugins: [babel()]}, 'iife'))
        .pipe(concat('app.min.js'))
        // .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/build/js'))
        .pipe(browserSync.stream());
});

gulp.task('vendor', function() {
    return gulp.src(paths.vendor)
        .pipe(gulp.dest('public/build/js/vendor'))
});

gulp.task('fonts', function () {
    return gulp.src(paths.fonts)
        .pipe(gulp.dest('public/build/fonts'))
});
gulp.task('img', function () {
    return gulp.src(paths.img)
        .pipe(gulp.dest('public/build/img'))
});

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.styles, ['css']);
});

gulp.task('default', ['watch', 'css', 'scripts', 'vendor', 'fonts', 'img']);
