var gulp = require('gulp');
var gutil = require("gulp-util");
var tsc = require("gulp-typescript");
var less = require('gulp-less');
var jetpack = require('fs-jetpack');
var sourcemaps = require('gulp-sourcemaps');
var inject = require('gulp-inject');

var src = jetpack.cwd('src');
var dest = jetpack.cwd('build');

var vendor_paths_dev = [
    'src/node_modules/angular2/bundles/angular2.dev.js',
    'src/node_modules/angular2/bundles/router.dev.js',
    'src/node_modules/systemjs/dist/system.src.js',
    'src/node_modules/rxjs/bundles/Rx.js',
    'src/node_modules/es6-shim/es6-shim.js',
    'src/node_modules/angular2/bundles/angular2-polyfills.js'
]

gulp.task('clean', function () {
    return dest.dir('.', { empty: true });
})

gulp.task("copy", ['clean'], function () {
    src.copy('.', dest.path(), {
        overwrite: true,
        matching: ['*.html', '*.png', '*.jpg', '*.json', '!./node_modules/**']
    });
});

gulp.task("copy-vendor-js", ['clean'], function () {
    return gulp.src(vendor_paths_dev)
        .pipe(gulp.dest(dest.path('vendor')));
});

var injectOptions = {
    transform: function (filepath) {
        return "<script src='." + filepath + "'></script>";
    }
};

gulp.task('inject-vendor-js', ['copy', 'copy-vendor-js'], function () {
    var vendors = gulp.src(['./vendor/*.js', '!./vendor/system.src.js'], { cwd: './build' });

    return gulp.src('main.html', { cwd: './build' })
        .pipe(inject(vendors, injectOptions))
        .pipe(gulp.dest(dest.path()));
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

gulp.task("build", ['compile', 'copy', 'copy-vendor-js', 'inject-vendor-js', 'less'], function () {

});

gulp.task('less', ['clean'], function () {
    return gulp.src(src.path('stylesheets/main.less'))
        .pipe(less())
        .pipe(gulp.dest(dest.path('stylesheets')));
});
