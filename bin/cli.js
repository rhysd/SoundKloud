#! /usr/bin/env node

'use strict';

var child_process = require('child_process');
var electron = require('electron-prebuilt');
var path = require('path');

var detached = process.argv.indexOf("--detach") != -1;

var spawn_option = {
    stdio: detached ? 'ignore' : 'inherit',
    detached: detached
};

child_process.spawn(electron, [path.join(__dirname, '..')], spawn_option).unref();
