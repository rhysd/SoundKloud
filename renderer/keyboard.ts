/// <reference path="../typings/mousetrap/mousetrap.d.ts" />

namespace Keyboard {
    export class Receiver {
        callbacks: Object;

        constructor(remote) {
            this.callbacks = {};
            const shortcuts = remote.require('./config').load().shortcuts;
            const handler_for = action => () => this.dispatch(action);

            for (const keyinput in shortcuts) {
                Mousetrap.bind(keyinput, handler_for(shortcuts[keyinput]));
            }
        }

        on(action: string, callback: () => void): void {
            this.callbacks[action] = callback;
        }

        dispatch(action: string): void {
            if (action in this.callbacks) {
                this.callbacks[action]();
            }
        }
    }
}
