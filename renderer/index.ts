/// <reference path="lib.d.ts" />
/// <reference path="keyboard.ts" />

require('electron-cookies');

onload = function(){
    const remote = require('remote');
    const config = remote.require('./config');
    const shell = remote.require('shell');
    const path = remote.require('path');

    const user_config = config.load();
    const config_dir = config.getConfigDir();

    let receiver = new Keyboard.Receiver(remote);
    let webview = <ElectronWebview>document.getElementById('main-view');
    webview.src = user_config.start_page;

    if (user_config.preload_js) {
        webview.preload = 'file://' + path.join(config_dir, user_config.preload_js);
    }

    webview.addEventListener('dom-ready', function(){
        if (user_config.preload_css) {
            const readFile = remote.require('fs').readFile;
            readFile(path.join(config_dir, user_config.preload_css), function(err, content) {
                if (err) {
                    console.log(err);
                    return;
                }
                webview.insertCSS(content);
            });
        }

        receiver.on('WebviewDevTools', () => webview.openDevTools());
    });

    webview.addEventListener('new-window', function(e: any){
        console.log('Guest window tries to open new window: ' + e.url);
        if (e.url.startsWith('https://soundcloud.com/connect')) {
            webview.src = 'https://soundcloud.com/connect?client_id=c259bb0ada8692d041954ac79e5eb394&response_type=token&redirect_uri=https%3A//soundcloud.com';
        }
        if (!e.url.startsWith('https://soundcloud.com/')) {
          shell.openExternal(e.url);
        }
    });

    webview.addEventListener('plugin-crashed', function(e: any){
        console.log(`Plugin crashed: ${e.name}(${e.version})`);
    });

    receiver.on('GoBack', () => webview.goBack());
    receiver.on('GoForward', () => webview.goForward());
    receiver.on('Reload', () => webview.reload());
    receiver.on('ScrollDown', () => webview.executeJavaScript('window.scrollBy(0, window.innerHeight / 5)'));
    receiver.on('ScrollUp', () => webview.executeJavaScript('window.scrollBy(0, -window.innerHeight / 5)'));
    receiver.on('Undo', () => webview.undo());
    receiver.on('Redo', () => webview.redo());
    receiver.on('Cut', () => webview.cut());
    receiver.on('Copy', () => webview.copy());
    receiver.on('Paste', () => webview.paste());
    receiver.on('SelectAll', () => webview.selectAll());
    receiver.on('QuitApp', () => remote.require('app').quit());
    receiver.on('DevTools', () => remote.getCurrentWindow().toggleDevTools());
    receiver.on('NextTrack', () => webview.executeJavaScript(`
                    (function(){
                        const skip_next = document.querySelector('button.skipControl__next');
                        if (skip_next) {
                            skip_next.click();
                        }
                    })();
                `));
    receiver.on('PreviousTrack', () => webview.executeJavaScript(`
                    (function(){
                        const skip_previous = document.querySelector('button.skipControl__previous');
                        if (skip_previous) {
                            skip_previous.click();
                        }
                    })();
                `));
    receiver.on('PlayStop', () => webview.executeJavaScript(`
                    (function(){
                        const play_control = document.querySelector('button.playControl');
                        if (play_control) {
                            play_control.click();
                        }
                    })();
                `));
}
