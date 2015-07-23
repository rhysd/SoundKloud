/// <reference path="lib.d.ts" />

require('electron-cookies');

var webview = document.getElementById('main-view');
webview.addEventListener('dom-ready', function(){
    webview.openDevTools();
});
