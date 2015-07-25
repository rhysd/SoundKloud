import * as Menu from 'menu';
import * as shell from 'shell';

export function set(main_window: GitHubElectron.BrowserWindow) {
    const template = [
        {
            label: 'SoundKloud',

            submenu: [
                {
                    label: 'Reload',
                    click: function(){ main_window.reload(); }
                },
                {
                    label: 'DevTools',
                    click: function(){ main_window.toggleDevTools(); }
                },
                {
                    label: 'Quit App',
                    accelerator: 'CommandOrControl+Q',
                    click: function(){ main_window.close(); }
                },
                {
                    type: 'separator'
                },
                {
                    label: 'About SoundKloud',
                    click: function(){ shell.openExternal('https://github.com/rhysd/SoundKloud'); }
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
    return menu;
}
