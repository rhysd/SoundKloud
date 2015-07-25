import * as Menu from 'menu';
import * as shell from 'shell';
import * as app from 'app';

export function set(main_window: GitHubElectron.BrowserWindow) {
    const template = [
        {
            label: 'SoundKloud',

            submenu: [
                {
                    label: 'Reload',
                    click: main_window.reload,
                },
                {
                    label: 'DevTools',
                    click: main_window.toggleDevTools,
                },
                {
                    label: 'Quit App',
                    accelerator: 'CommandOrControl+Q',
                    click: app.quit,
                },
                {
                    type: 'separator'
                },
                {
                    label: 'About SoundKloud',
                    click: () => shell.openExternal('https://github.com/rhysd/SoundKloud'),
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
    return menu;
}
