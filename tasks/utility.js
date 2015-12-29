'use strict';

var argv = require('yargs').argv;
var jetpack = require('fs-jetpack');

var projectDir = jetpack;

module.exports = {
    platforms: ['darwin', 'linux', 'win32'],

    isPlatformValid: function (platform) {
        return this.platforms.indexOf(platform) !== -1
    },

    getEvironmentCode: function () {
        return argv.env || 'dev'
    },

    getPlatform: function () {
        return argv.platform || 'win32'
    },

    getElectronVersion: function() {
        var packconf = projectDir.read('package.json', 'json');
        return packconf.devDependencies['electron-prebuilt'].substring(1);
    }
}