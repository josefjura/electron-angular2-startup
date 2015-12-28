var gulp = require('gulp');
var gutil = require('gulp-util');
var packager = require('electron-packager');
var createInstaller = require('electron-installer-squirrel-windows');
var jetpack = require('fs-jetpack');
var env = jetpack.read('./src/package.json', 'json');
var argv = require('yargs').argv;

var temp = jetpack.cwd('temp');
var build = jetpack.cwd('build');
var release = jetpack.cwd('release');

gulp.task('clear', function () {
    return temp.dir('.', { empty: true });
});


gulp.task('release', ['clear'], function (cb) {
    var platform = argv.platform || 'win32';

    packager({
        dir: build.path(),
        out: temp.path(),
        asar: true,
        name: env.name,
        platform: platform,
        arch: 'all',
        version: '0.36.1'
    }, function done(err, appPath) {
        if (err || !appPath) {
            gutil.log(err);
            cb(err);
            return;
        };

        create(appPath);
        cb(err);
    });
});


function create(appPath) {
    for (var pathIndex in appPath) {
        if (appPath.hasOwnProperty(pathIndex)) {
            var path = appPath[pathIndex];

            createInstaller(
                {
                    out: release.path(env.version),
                    authors: env.author,
                    name: env.name,
                    product_name: env.name,
                    path: path,
                    version: env.version,
                    debug: true,
                    exe: 'AppSetup.exe'
                },
                function (err) {
                    gutil.log(err);
                }
                );
        }
    }
}
