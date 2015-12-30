var gulp = require('gulp');
var gutil = require("gulp-util");
var tsc = require("gulp-typescript");
var less = require('gulp-less');
var jetpack = require('fs-jetpack');
var sourcemaps = require('gulp-sourcemaps');
var inject = require('gulp-inject');
var util = require('./utility');

var src = jetpack.cwd('src');
var dest = jetpack.cwd('build');

var vendor_bundles_dev = [
    'node_modules/angular2/bundles/angular2.dev.js',
    'node_modules/angular2/bundles/router.dev.js',
    'node_modules/systemjs/dist/system.src.js',
    'node_modules/rxjs/bundles/Rx.js',
    'node_modules/es6-shim/es6-shim.js',
    'node_modules/angular2/bundles/angular2-polyfills.js'
]

gulp.task('clean', function () {
    return dest.dir('.', { empty: true });
})

gulp.task("copy", ['clean'], function () {
    src.copy('.', dest.path(), {
        overwrite: true,
        matching: ['main.html', 'app/app.layout.html', './templates/*.html', './assets/**/*', './node_modules/**/*']
    });
});

gulp.task("copy-vendor-bundles", ['clean'], function () {
    return gulp.src(vendor_bundles_dev)
        .pipe(gulp.dest(dest.path('vendor')));
});

gulp.task('copy-configs', function () {
    var env = util.getEvironmentCode();

    var packconf = src.read('package.json', 'json');

    if (env !== 'prod') {
        packconf.name += "-" + env;
        if (packconf.productName)
            packconf.productName += "-" + env;
    }

    dest.write('package.json', packconf);
})

var injectOptions = {
    jsTransform: function (filepath) {
        return "<script src='." + filepath + "'></script>";
    },
    cssTransform: function (filepath) {
        return "<link rel='stylesheet' type='text/css' href='." + filepath + "'>";
    }
};

gulp.task('inject-vendor-js', ['copy', 'copy-vendor-bundles'], function () {
    var vendors = gulp.src(['./vendor/*.js', '!./vendor/system.src.js'], { cwd: dest.path() });

    return gulp.src('main.html', { cwd: dest.path() })
        .pipe(inject(vendors, { transform: injectOptions.jsTransform }))
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

gulp.task("build", ['build-head', 'compile', 'copy', 'copy-vendor-bundles', 'copy-configs', 'inject-vendor-js', 'less', 'less-inject'], function () {

});

gulp.task('build-head', ['clean'], function (cb) {
    gutil.log("Building in " + util.getEvironmentCode().toUpperCase() + " environment against Electron v" + util.getElectronVersion() + "");
})

gulp.task('less', ['clean'], function () {
    return gulp.src(src.path('stylesheets/main.less'))
        .pipe(less())
        .pipe(gulp.dest(dest.path('stylesheets')));
});

gulp.task('less-inject', ['clean', 'less'], function () {
    var stylesheets = gulp.src('./stylesheets/*.css', { cwd: dest.path(), read: false });

    return gulp.src('main.html', { cwd: dest.path() })
        .pipe(inject(stylesheets, { transform: injectOptions.cssTransform }))
        .pipe(gulp.dest(dest.path()));
});
