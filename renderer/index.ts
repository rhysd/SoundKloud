/// <reference path="lib.d.ts" />

require('electron-cookies');

onload = function(){
    let webview = document.getElementById('main-view');

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
}

