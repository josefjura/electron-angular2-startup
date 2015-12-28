var gulp = require('gulp');
var gutil = require('gulp-util');
var packager = require('electron-packager');
var createInstallers = require('./create-installers');
var jetpack = require('fs-jetpack');
var env = jetpack.read('./src/package.json', 'json');
var argv = require('yargs').argv;

var temp = jetpack.cwd('temp');
var build = jetpack.cwd('build');
var release = jetpack.cwd('release');

gulp.task('clear', function () {
    return temp.dir('.', { empty: true });
});

var platforms = ['darwin', 'linux', 'win32'];
gulp.task('release', ['clear'], function (cb) {

    var platform = argv.platform || 'win32';
    if (platforms.indexOf(platform) === -1) {
        return cb("Unknown platform '" + platform + "'. Supported platforms are: "+platforms.join(", ")+".");
    }

    packager({
        dir: build.path(),
        out: temp.path(env.version),
        asar: true,
        name: env.name,
        platform: platform,
        arch: 'all',
        version: '0.36.1',
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
            gutil.log("Package created, installer can be currently created only on win32 platform. Copying packages to release folder");
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


