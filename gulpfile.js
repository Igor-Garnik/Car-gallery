const gulp = require('gulp');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify-es').default;
let rollup = require('gulp-better-rollup');
let babel = require('rollup-plugin-babel');
let sourcemaps = require('gulp-sourcemaps');
let cssmin = require('gulp-cssmin');
let del = require('del');
let browserSync = require('browser-sync').create();


gulp.task('clean', function() {
    return del(['build']);
});

gulp.task('js', function() {
	return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
		.pipe(gulp.dest("src/build/tools"))
		.pipe(browserSync.stream());
})

gulp.task('css', function() {
    return gulp.src('src/css/*.css')
        .pipe(concat('main.min.css'))
        .pipe(sourcemaps.init())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('src/build/css'))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
    return gulp.src(['src/js/app.js'])
        .pipe(sourcemaps.init())
        .pipe(rollup({plugins: [babel()]}, 'iife'))
        .pipe(concat('app.min.js'))
        // .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('src/build/js'))
        .pipe(browserSync.stream());
});

gulp.task('fonts', function() {
	return gulp.src('node_modules/font-awesome/fonts/*')
		.pipe(gulp.dest("src/build/fonts"));
});

gulp.task('fa', function() {
	return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
		.pipe(gulp.dest("src/build/css"));
});

/* gulp.task('img', function () {
    return gulp.src(paths.img)
        .pipe(gulp.dest('public/build/img'))
});  */

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.styles, ['css']);
});

gulp.task('default', ['watch', 'js', 'css', 'scripts', 'fonts', 'fa']);