declare function require(mod: string): any; // tsurai

interface HTMLElement {
    openDevTools: () => void;
    src: string;
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
}
