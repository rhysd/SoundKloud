import * as path from 'path';
require('crash-reporter').start();

// XXX:
// Use JavaScript style require() because 'menubar' identifier is
// already defined in TypeScript/bin/lib.d.ts and compiler complaints
// about the name conflict.
var mainMenu = require('menubar')({
    dir: __dirname,
    index: 'file://' + path.join(__dirname, '..', 'static', 'index.html'),
    icon: path.join(__dirname, '..', 'images', 'sc_gradient_24x12.png'),
    width: 800,
    height: 600,
});

