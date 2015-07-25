import * as path from 'path';
import * as app from 'app';
import * as flashplugin from './flashplugin';
import * as menu from './menu';
import * as shortcuts from './keyshortcuts'

require('crash-reporter').start();
flashplugin.enable();

// XXX:
// Use JavaScript style require() because 'menubar' identifier is
// already defined in TypeScript/bin/lib.d.ts and compiler complaints
// about the name conflict.
var mainMenu = require('menubar')({
    dir: __dirname,
    index: 'file://' + path.join(__dirname, '..', 'static', 'index.html'),
    icon: path.join(__dirname, '..', 'images', 'sc_gradient_24x12.png'),
    width: 960,
    height: 720,
    'web-preferences': {
      'plugins': true
    },
});

mainMenu.on('after-create-window', function(){
    // Debug
    // mainMenu.window.openDevTools();

    menu.set(mainMenu.window);

    // TODO: Temporary
    let g: shortcuts.GlobalShortcut = {
        key: "CmdOrCtrl+S",
        callback: function() {
            mainMenu.tray.emit('clicked');
        }
    };

    let s = new shortcuts.KeyShortcuts(mainMenu.window, {}, g)

    mainMenu.window.on('closed', function(){
        s.unregisterAll();
    });
});

