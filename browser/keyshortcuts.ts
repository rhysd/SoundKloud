import * as globalShortcut from 'global-shortcut';

export interface GlobalShortcut {
    key: string;
    callback: () => void;
}

export class KeyShortcuts {
    shortcuts: Object;
    global_shortcut: GlobalShortcut;

    constructor(
        browser_window: GitHubElectron.BrowserWindow,
        shortcuts: Object,
        global_shortcut?: GlobalShortcut
    ) {
        let sender =  browser_window.webContents;
        this.shortcuts = {};

        // Note: Generating below function in 'for' loop make jshint angry
        const quit_app = () => browser_window.close();
        const toggle_devtools = () => browser_window.toggleDevTools();
        const key_receiver_for = function(s: string): () => void {
            return function() {
                sender.send('keyinput', s);
            };
        };

        for (const k in shortcuts) {
            var shortcut = shortcuts[k];

            if (!shortcut || shortcut === '') {
                continue;
            }

            if (shortcut === 'DevTools') {
                this.shortcuts[k] = toggle_devtools;
                continue;
            }

            if (shortcut === 'QuitApp') {
                this.shortcuts[k] = quit_app;
                continue;
            }

            this.shortcuts[k] = key_receiver_for(shortcut);
        }

        browser_window.on('blur', () => {
            this.unregisterLocalShortcuts();
        });
        browser_window.on('focus', () => {
            this.registerAll();
        });

        if (global_shortcut && global_shortcut.key !== '') {
            this.global_shortcut = global_shortcut;
            this.registerGlobalShortcut();
        }
    }

    registerGlobalShortcut() {
        globalShortcut.register(this.global_shortcut.key, this.global_shortcut.callback);
    }

    registerAll() {
        for (const key in this.shortcuts) {
            globalShortcut.register(key, this.shortcuts[key]);
        }
    }

    unregisterLocalShortcuts() {
        globalShortcut.unregisterAll();
        this.registerGlobalShortcut();
    }

    unregisterAll() {
        globalShortcut.unregisterAll();
    }
}

