'use strict'

const destDir = 'bin';

const gulp = require('gulp');
const bower = require('gulp-bower');
const gulpIf = require('gulp-if');
const concat = require('gulp-concat');
const less = require('gulp-less');
const argv = require('yargs').argv;
const debug = require( 'gulp-debug' );
const clean = require( 'gulp-clean' );
const livereload = require('gulp-livereload');
const csscomb = require('gulp-csscomb');
const jscs = require('gulp-jscs');
const jshint = require('gulp-jshint');
const htmlhint = require('gulp-htmlhint');
const runSequence = require('run-sequence');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const autoprefixer= require('gulp-autoprefixer');

gulp.task('default', function () {
    runSequence('clean', 'build', 'watch');
});

gulp.task('libs', function () {
    return gulp.src('libs/**/*.min.js')
        .pipe(gulp.dest(destDir + '/libs/'));
});

gulp.task('build', ['libs', 'html', 'css', 'images']);

gulp.task('bower', function () {
    return bower('libs');
});

// A.W.: Due to home task conditions I cannot imagine how to
// implement this gulp task without negations. Have to be
// discussed
gulp.task('images', function () {
    return gulp.src(['**/*.{png,jpg,svg}', '!node_modules/**', '!libs/**', '!bin/**'])
        .pipe(gulp.dest(destDir))
        .pipe(livereload());
});

// A.W.: Same as for 'images' task above. How to avoid negations?
gulp.task('html', function () {
    return gulp.src(['**/*.html', '!node_modules/**', '!libs/**', '!bin/**'])
        .pipe(gulpIf(argv.prod, htmlmin({ collapseWhitespace: true })))
        .pipe(gulp.dest(destDir))
        .pipe(livereload());
});

gulp.task('css', function () {
    return gulp.src('styles/**/*.less')
        .pipe(concat('styles.css'))
        .pipe(less())
        .pipe(gulpIf(argv.prod, sourcemaps.init()))
        .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
        .pipe(cssnano().on('error', handleError))
        .pipe(gulpIf(argv.prod, sourcemaps.write('.')))
        .pipe(gulp.dest(destDir + '/static/'))
        .pipe(livereload());
});

gulp.task('js', function () {
    return gulp.src('js/**/*.js')
        .pipe(concat('script.js'))
        .pipe(gulpIf(argv.prod, sourcemaps.init()))
        .pipe(uglify().on('error', handleError))
        .pipe(gulpIf(argv.prod, sourcemaps.write('.')))
        .pipe(gulp.dest(destDir))
        .pipe(livereload());
});

gulp.task('reload-page', function () {
    livereload.listen();
});

gulp.task( 'clean', function () {
    return gulp.src( destDir + '/*', { read: false } )
        .pipe(clean({ force: true }));
} );

// A.W.: Again negations
gulp.task( 'watch', function () {
    gulp.watch(['**/*.{png,jpg,svg}', '!node_modules/**', '!libs/**', '!bin/**'], ['images']);
    gulp.watch(['**/*.html', '!node_modules/**', '!libs/**', '!bin/**'], ['html']);
    gulp.watch('styles/**/*.less', ['css']);
    gulp.watch('js/**/*.js', ['js']);
} );

// CODESTYLE //

gulp.task('csscomb', function () {
    return gulp.src('styles/*.less')
        .pipe(csscomb('.csscomb.json').on('error', handleError))
        .pipe(gulp.dest(function (file) {
            return file.base;
        }));
});

// A.W.: Again negations
gulp.task('htmlhint', function () {
    return gulp.src(['**/*.html', '!node_modules/**', '!libs/**', '!bin/**'])
        .pipe(htmlhint('.htmlhintrc'))
        .pipe(htmlhint.reporter())
        .pipe(gulp.dest(function (file) {
            return file.base;
        }));
});

gulp.task('jscs', function () {
    return gulp.src('js/**/*.js')
        .pipe(jscs({ fix: true }))
        .pipe(gulp.dest(function (file) {
            return file.base;
        }));
});

gulp.task('jshint', function () {
    return gulp.src('js/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'));
});

gulp.task('style', function () {
    runSequence('csscomb', 'htmlhint', 'jscs', 'jshint');
});

// CODESTYLE //

function handleError(err) {
    console.log(err.toString());
    this.emit('end');
    return this;
}