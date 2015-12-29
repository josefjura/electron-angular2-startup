var gulp = require('gulp');
var gutil = require('gulp-util');
var packager = require('electron-packager');
var createInstallers = require('./create-installers');
var jetpack = require('fs-jetpack');
var env = jetpack.read('./src/package.json', 'json');
var util = require('./utility');

var temp = jetpack.cwd('temp');
var build = jetpack.cwd('build');
var release = jetpack.cwd('release');

gulp.task('clear', function () {
    return temp.dir('.', { empty: true });
});


gulp.task('release', ['clear'], function (cb) {

    var platform = util.getPlatform();
    if (!util.isPlatformValid(platform)) {
        return cb("Unknown platform '" + platform + "'. Supported platforms are: " + util.platforms.join(", ") + ".");
    }

    packager({
        dir: build.path(),
        out: temp.path(env.version),
        asar: false,
        name: env.name,
        platform: platform,
        arch: 'all',
        version: util.getElectronVersion(),
        overwrite: true
    }, function done(err, appPath) {
        if (err || !appPath) {
            gutil.log(err);
            return;
        };
        if (platform === 'win32') {
            createInstallers(env, appPath, function () {
                cb(err);
            });
        }
        else {
            gutil.log("Packages created, installer can be currently created only on win32 platform. Copying packages to release folder");
            for (var pathIndex in appPath) {
                if (appPath.hasOwnProperty(pathIndex)) {
                    var path = appPath[pathIndex];
                    var target = path.replace('\\temp\\', '\\release\\');
                    jetpack.copy(path, target, { overwrite: true });
                }
            }
        }
    });
});


