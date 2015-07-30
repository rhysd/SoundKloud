import * as path from 'path';
import * as app from 'app';
import * as shortcut from 'global-shortcut';
import * as flashplugin from './flashplugin';
import * as menu from './menu';
import {load as loadConfig} from './config';

require('crash-reporter').start();

const config = loadConfig();

var menuConfig = {
    dir: __dirname,
    index: 'file://' + path.join(__dirname, '..', 'static', 'index.html'),
    icon: path.join(__dirname, '..', 'images', 'sc_' + config.icon_type + '_24x12.png'),
    width: 1000,
    height: 750,
    preloadWindow: true,
};

if (config.flash_plugin.enabled) {
    flashplugin.enable(config.flash_plugin);
    menuConfig['web-preferences'] = {
        plugins: true,
    };
}

// XXX:
// Use JavaScript style require() because 'menubar' identifier is
// already defined in TypeScript/bin/lib.d.ts and compiler complaints
// about the name conflict.
var mainMenu: MenuBar = require('menubar')(menuConfig);

mainMenu.on('after-create-window', function(){
    // Debug
    // mainMenu.window.openDevTools();

    menu.set(mainMenu.window);

    // Define global hotkey
    if (config.hot_key) {
        let k = config.hot_key;
        shortcut.register(
                config.hot_key.replace(/mod/, 'CmdOrCtrl'),
                () => mainMenu.tray.emit('clicked', undefined, {x: 0, y: 0, width: 0, height: 0})
            );
    }

    mainMenu.window.on('closed', function(){
        shortcut.unregisterAll();
    });
});

