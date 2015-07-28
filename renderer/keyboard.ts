/// <reference path="../typings/mousetrap/mousetrap.d.ts" />

namespace Keyboard {
    export class Receiver {
        callbacks: Object;
        jumper: (url: string) => void;

        constructor(remote) {
            this.callbacks = {};
            const shortcuts = remote.require('./config').load().shortcuts;
            const handler_for = action => () => this.dispatch(action);
            const jumper_for = url => () => this.openURL(url);

            for (const keyinput in shortcuts) {
                const action = shortcuts[keyinput];
                if (action.startsWith('https://soundcloud.com/')) {
                    Mousetrap.bind(keyinput, jumper_for(action));
                } else {
                    Mousetrap.bind(keyinput, handler_for(action));
                }
            }
        }

        on(action: string, callback: () => void): void {
            this.callbacks[action] = callback;
        }

        onURL(jumper: (url: string) => void): void {
            this.jumper = jumper;
        }

        dispatch(action: string): void {
            if (action in this.callbacks) {
                this.callbacks[action]();
            }
        }

        openURL(url: string): void {
            if (this.jumper) {
                this.jumper(url);
            }
        }
    }
}
