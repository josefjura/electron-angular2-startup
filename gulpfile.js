var gulp = require('gulp');
var gutil = require("gulp-util");
var tsc = require("gulp-typescript");
var less = require('gulp-less');
var jetpack = require('fs-jetpack');
var sourcemaps = require('gulp-sourcemaps');

var src = jetpack.cwd('src');
var dest = jetpack.cwd('build');

gulp.task('clean', function () {
    return dest.dir('.', { empty: true });
})

gulp.task("copy", ['clean'], function () {
    src.copy('.', dest.path(), {
        overwrite: true,
        matching: ['*.html', '*.png', '*.jpg', '*.json', '!./node_modules/**']
    });
});

gulp.task("copy-node", ['clean'], function () {
    src.copy('.', dest.path(), {
        overwrite: true,
        matching: ['./node_modules/**']
    });
});

var tsProject = tsc.createProject('tsconfig.json');
gulp.task("compile", ['clean'], function (callback) {
    return tsProject.src()
        .pipe(tsc(tsProject))
        .pipe(gulp.dest('build'))
});

gulp.task("compile-with-maps", ['clean'], function (callback) {
    return tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('build'))
});

gulp.task("build", ['compile', 'copy', 'copy-node', 'less'], function () {

});

gulp.task('less', ['clean'], function () {
    return gulp.src(src.path('stylesheets/main.less'))
        .pipe(less())
        .pipe(gulp.dest(dest.path('stylesheets')));
});
