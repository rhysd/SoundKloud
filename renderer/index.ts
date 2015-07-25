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

    KeyReceiver.on('GoBack', function(){
        webview.goBack();
    });

    KeyReceiver.on('GoForward', function(){
        webview.goForward();
    });

    KeyReceiver.on('Reload', function(){
        webview.reload();
    });

    KeyReceiver.on('ScrollDown', function(){
        webview.executeJavaScript('window.scrollBy(0, window.innerHeight / 5)');
    });

    KeyReceiver.on('ScrollUp', function(){
        webview.executeJavaScript('window.scrollBy(0, -window.innerHeight / 5)');
    });
}

