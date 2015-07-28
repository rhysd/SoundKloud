declare function require(mod: string): any; // tsurai

interface ElectronWebview extends HTMLElement {
    src: string;
    preload: string;

    openDevTools(): void;
    goBack(): void;
    goForward(): void;
    reload(): void;
    undo(): void;
    redo(): void;
    cut(): void;
    copy(): void;
    paste(): void;
    selectAll(): void;
    executeJavaScript(src: string): void;
    insertCSS(src: string): void;
}

