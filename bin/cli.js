#! /usr/bin/env node

'use strict';

var child_process = require('child_process');
var electron = require('electron-prebuilt');
var path = require('path');

var detached = process.argv.indexOf("--detach") != -1;
var args = [path.join(__dirname, '..')];

if (detached) {
    child_process.spawn(electron, args, {
        stdio: 'ignore',
        detached: true
    }).unref();
} else {
    child_process.spawn(electron, args, {
        stdio: 'inherit'
    });
}
