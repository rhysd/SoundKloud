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
    preload_js: string;
    preload_css: string;
}

export function getConfigDir(): string {
    return app.getPath('userData');
}

export function load(): Config {
    if (this.cache) {
        return this.cache
    }

    this.cache = <Config>{
        icon_type: 'gradient',
        hot_key: 'CmdOrCtrl+Shift+S',
        flash_plugin: {
            enabled: false,
            plugin_path: '',
            plugin_version: '',
        },
        shortcuts: {
            'mod+q': 'QuitApp',
            'mod+r': 'Reload',
            'mod+x': 'Cut',
            'mod+c': 'Copy',
            'mod+v': 'Paste',
            'mod+p': 'PreviousTrack',
            'mod+n': 'NextTrack',
            'mod+s': 'PlayStop',
        },
        start_page: 'https://soundcloud.com',
        preload_js: null,
        preload_css: null,
    };

    function mergeConfig(c1: Config, c2: Object) {
        for (const k in c2) {
            const v2 = c2[k];

            if (k in c1) {
                let v1 = c1[k];
                if (typeof(v1) === 'object' && typeof(v2) === 'object') {
                    mergeConfig(v1, v2);
                    continue;
                }
            }

            c1[k] = c2[k];
        }
    }

    const file = path.join(getConfigDir(), 'config.yml');
    try {
        const user_config = yaml.load(fs.readFileSync(file, {encoding: 'utf8'}));
        mergeConfig(this.cache, user_config);
    } catch(e) {
        console.log('Configuration file not found: ' + file);
    }

    return this.cache;
}
