/// <reference path="lib.d.ts" />

require('electron-cookies');

onload = function(){
    const config = require('remote').require('./config').load();

    let webview = document.getElementById('main-view');
    webview.src = config.start_page;

    // Debug
    // webview.addEventListener('dom-ready', function(){
    //     webview.openDevTools();
    // });

    webview.addEventListener('new-window', function(e: any){
        console.log('guest window tries to open new window: ' + e.url);
        if (e.url.startsWith('https://soundcloud.com/connect')) {
            webview.src = 'https://soundcloud.com/connect?client_id=c259bb0ada8692d041954ac79e5eb394&response_type=token&redirect_uri=https%3A//soundcloud.com';
        }
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

