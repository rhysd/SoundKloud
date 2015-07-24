import * as path from 'path';
require('crash-reporter').start();
import * as app from 'app';
import * as flashplugin from './flashplugin';
import * as menu from './menu';
import * as shortcuts from './keyshortcuts'

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

    // TODO: Temporary
    var g: shortcuts.GlobalShortcut = {
        key: "ControlOrCommand+Shift+Space",
        callback: function() {
            if (mainMenu.window.isVisible()) {
                mainMenu.hideWindow();
            } else {
                mainMenu.showWindow();
            }
        }
    };

    let s = new shortcuts.KeyShortcuts(mainMenu.window, {}, g)
    mainMenu.window.on('closed', function(){
        s.unregisterAll();
    });

    menu.set(mainMenu.window);
});
