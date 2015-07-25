import * as path from 'path';
import * as app from 'app';
import * as flashplugin from './flashplugin';
import * as menu from './menu';
import * as shortcuts from './keyshortcuts'
import {load as loadConfig} from './config';

require('crash-reporter').start();

const config = loadConfig();
if (config.enable_flash) {
    flashplugin.enable();
}

// XXX:
// Use JavaScript style require() because 'menubar' identifier is
// already defined in TypeScript/bin/lib.d.ts and compiler complaints
// about the name conflict.
var mainMenu = require('menubar')({
    dir: __dirname,
    index: 'file://' + path.join(__dirname, '..', 'static', 'index.html'),
    icon: path.join(__dirname, '..', 'images', 'sc_' + config.icon_type + '_24x12.png'),
    width: 1000,
    height: 750,
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
        key: config.hot_key,
        callback: function() {
            mainMenu.tray.emit('clicked');
        }
    };

    let s = new shortcuts.KeyShortcuts(mainMenu.window, config.shortcuts, g);

    mainMenu.window.on('closed', function(){
        s.unregisterAll();
    });
});

