import * as app from 'app';
import * as path from 'path';
import * as fs from 'fs';

export function enable() {
    const so_file = path.join(__dirname, '..', 'plugins', `libpepflashplayer-${process.platform}-${process.arch}.so`);
    fs.exists(so_file, function(exists: boolean){
        if (exists) {
            app.commandLine.appendSwitch('ppapi-flash-path', so_file);

            // Note: May not be required
            app.commandLine.appendSwitch('ppapi-flash-version', '17.0.0.188');

            console.log('Set flashplayer plugin: ' + so_file);
        } else {
            console.log('Flashplayer plugin is not found');
        }
    });
}

export function disable(): boolean {
    return false;
}
