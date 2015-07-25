import * as app from 'app';
import * as path from 'path';
import * as fs from 'fs';
import {FlashPluginConfig} from './config';

function is_valid_config(config: FlashPluginConfig): boolean {
    if (!fs.existsSync(config.plugin_path)) {
        console.log('Invalid configuration: ' + config.plugin_path + " doesn't exist.");
        return false;
    }

    const valid_path = function(name: string): boolean {
        if (path.basename(config.plugin_path) !== name) {
            console.log(`Invalid configuration: flash plugin's name must be '${name}' in ${process.platform}`);
            return false;
        }
        return true;
    }

    switch(process.platform) {
        case 'darwin': {
            if (!valid_path('PepperFlashPlayer.plugin')) {
                return false;
            }
            break;
        }

        case 'linux': {
            if (!valid_path('libpepflashplayer.so')) {
                return false;
            }
            break;
        }

        case 'win32': {
            if (!valid_path('pepflashplayer.dll')) {
                return false;
            }
            break;
        }

        default: {
            // Do nothing for unknown platform
            break;
        }
    }

    return true;
}

export function enable(config: FlashPluginConfig) {
    if (is_valid_config(config)) {
        app.commandLine.appendSwitch('ppapi-flash-path', config.plugin_path);

        // Note: May not be required
        if (config.plugin_version !== '') {
            app.commandLine.appendSwitch('ppapi-flash-version', config.plugin_version);
        }
    }
}

export function disable(): boolean {
    return false;
}
