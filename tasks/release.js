var gulp = require('gulp');
var gutil = require('gulp-util');
var packager = require('electron-packager');
var jetpack = require('fs-jetpack');


var createInstaller = require('electron-installer-squirrel-windows');
var lastPackageUrl = "";

var temp = jetpack.cwd('temp');

gulp.task('clear', function () {
    return temp.dir('.', { empty: true });
});


gulp.task('package', ['clear'], function (cb) {
    packager({
        dir: './build',
        out: './temp',
        name: 'appName',
        platform: 'win32',
        arch: 'x64',
        version: '0.36.0'
    }, function done(err, appPath) {
        lastPackageUrl = appPath.toString();
        cb(err);
    });
});

gulp.task('release', ['package'], function (cb) {
    createInstaller(
        {
            out: './release',
            authors : "Josef Jura",
            name: 'appName',
            path: lastPackageUrl
        },
        function (err) {
            cb(err);
        }
        );
})

