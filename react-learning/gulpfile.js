var gulp = require('gulp');
var runSequence = require('run-sequence');
var browserify = require('browserify');
var bower = require('gulp-bower');
var clean = require('gulp-clean');
var livereload = require('gulp-livereload');

var DEST_DIR = 'client_build';
var DEST_LIBS_DIR = DEST_DIR + '/libs';
var PUBLIC_DIR = 'public';

// Gulp tasks
gulp.task('default', function (cb) {
    runSequence('build', cb);
});

gulp.task('dev', ['build'], function () {
    runSequence('watch');
});

gulp.task('build', function (cb) {
    runSequence(
        'clean-build',
        'copy-src',
        'bower',
        //['bower', 'browserify'],
        cb
    );
});

// TODO: browserify
// gulp.task('browserify', function () {
//     gulp.src('public/scripts/example.js')
//         .pipe(browserify({
//             insertGlobals: true,
//             paths: ['public'],
//             debug: !gulp.env.production
//         }))
//         .pipe(gulp.dest(DEST_DIR));
// });

gulp.task('copy-src', function () {
    return gulp.src(PUBLIC_DIR + '/**')
        .pipe(gulp.dest(DEST_DIR));
});

gulp.task('bower', function () {
    return bower(DEST_LIBS_DIR);
});

gulp.task('clean-build', function () {
    return gulp.src(DEST_DIR + '/*', {read: false})
        .pipe(clean({force: true}));
});

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(PUBLIC_DIR + '/**/*.@(html|js|css)', ['build-and-reload']);
});

gulp.task('build-and-reload', ['build'], function () {
    return gulp.src(DEST_DIR + '/**')
        .pipe(livereload());
});