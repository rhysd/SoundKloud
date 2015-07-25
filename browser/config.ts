import * as yaml from 'js-yaml';
import * as app from 'app';
import * as path from 'path';
import * as fs from 'fs';

export interface FlashPluginConfig {
    enabled: boolean;
    plugin_path: string;
    plugin_version: string;
}

export interface Config {
    icon_type: string;
    hot_key: string;
    flash_plugin: FlashPluginConfig;
    shortcuts: Object;
    start_page: string;
}

export function load(): Config {
    if (this.cache) {
        return this.cache
    }

    const default_config: Config = {
        icon_type: 'gradient',
        hot_key: 'CmdOrCtrl+Shift+S',
        flash_plugin: {
            enabled: false,
            plugin_path: '',
            plugin_version: '',
        },
        shortcuts: {
            'CmdOrCtrl+Q': 'QuitApp',
            'CmdOrCtrl+R': 'Reload',
        },
        start_page: 'https://soundcloud.com',
    };

    const file = path.join(app.getPath('userData'), 'config.yml');
    try {
        this.cache = yaml.load(fs.readFileSync(file, {encoding: 'utf8'}));
        for (const key in default_config) {
            if (!(key in this.cache)) {
                this.cache[key] = default_config[key];
            }
        }
    } catch(e) {
        console.log('Configuration file not found: ' + file);
        this.cache = default_config;
    }

    return this.cache;
}
