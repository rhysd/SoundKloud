/// <reference path="lib.d.ts" />

require('electron-cookies');

onload = function(){
    const remote = require('remote');
    const config = remote.require('./config');
    const shell = remote.require('shell');
    const path = remote.require('path');

    const user_config = config.load();
    const config_dir = config.getConfigDir();

    let webview = document.getElementById('main-view');
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

        // Debug
        // webview.openDevTools();
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

    KeyReceiver.on('GoBack', () => webview.goBack());
    KeyReceiver.on('GoForward', () => webview.goForward());
    KeyReceiver.on('Reload', () => webview.reload());
    KeyReceiver.on('ScrollDown', () => webview.executeJavaScript('window.scrollBy(0, window.innerHeight / 5)'));
    KeyReceiver.on('ScrollUp', () => webview.executeJavaScript('window.scrollBy(0, -window.innerHeight / 5)'));
    KeyReceiver.on('Undo', () => webview.undo());
    KeyReceiver.on('Redo', () => webview.redo());
    KeyReceiver.on('Cut', () => webview.cut());
    KeyReceiver.on('Copy', () => webview.copy());
    KeyReceiver.on('Paste', () => webview.paste());
    KeyReceiver.on('SelectAll', () => webview.selectAll());
}
