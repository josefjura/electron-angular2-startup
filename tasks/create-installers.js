var gutil = require('gulp-util');
var electronInstaller = require('electron-installer-squirrel-windows');

function createAllInstallers(env, appPath, cb) {
    var i = 0;
    var loop = function (appPath) {
        createInstaller(env, appPath[i], function () {
            i++;

            if (i < appPath.length) {
                loop(appPath);
            }
            else cb();
        });
    }

    loop(appPath, cb);
}


function createInstaller(env, path, next) {
    gutil.log("Creating installer for : " + path);
    electronInstaller(
        {
            out: path.replace('\\temp\\', '\\release\\'),
            authors: env.author,
            exe: env.name + ".exe",
            path: path,
            version: env.version,
            overwrite: true
        },
        function (err) {
            if (err) {
                gutil.log(err);
                return;
            }
            next();
        }
        );
}

module.exports = createAllInstallers;