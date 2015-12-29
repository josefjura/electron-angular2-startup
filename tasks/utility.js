'use strict';

var argv = require('yargs').argv;

module.exports = {
    platforms: ['darwin', 'linux', 'win32', 'glox'],

    isPlatformValid: function (platform) {
        return this.platforms.indexOf(platform) !== -1
    },

    getEvironmentCode: function () {
        return argv.env || 'dev'
    },

    getPlatform: function () {
        return argv.platform || 'win32'
    }
}