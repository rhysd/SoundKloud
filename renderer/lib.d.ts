declare function require(mod: string): any; // tsurai

interface HTMLElement {
    openDevTools: () => void;
    src: string;
    goBack(): void;
    goForward(): void;
    reload(): void;
    executeJavaScript(src: string): void;
}
