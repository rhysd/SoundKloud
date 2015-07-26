SoundKloud
==========
[![Build Status](https://travis-ci.org/rhysd/SoundKloud.svg)](https://travis-ci.org/rhysd/SoundKloud)
[![npm version](https://badge.fury.io/js/soundkloud.svg)](http://badge.fury.io/js/soundkloud)

SoundKloud is a [SoundCloud](https://soundcloud.com) browser integrated with menu bar.

![overall screenshot](https://raw.githubusercontent.com/rhysd/screenshots/master/SoundKloud/overall.png)

SoundCloud is an awesome web service I often use.  However, it provides only website in OS X.  I don't want to find a browser in my desktop and then find the SoundCloud tab in my browser only for skipping, stopping and playing the music.  So I created this app.
You can access to the browser at any time via your Desktop menubar.

SoundKloud is cross-platform application (on [Electron](https://github.com/atom/electron)).  You can use SoundKloud on OS X, Linux and Windows.

## Installation

### Release

Install SoundKloud from [Release Page](https://github.com/rhysd/SoundKloud/releases), unzip it. It is already ready to use.

- __OS X:__ Simply use `SoundKloud.app` in the directory.  If you want to install it to your system, move it to `~/Applications`.
- __Linux:__ Simply use `soundkloud` executable in the directory.  If you want to install it to your system, set symbolic link to the executable from `/usr/local/bin`.
- __Windows:__ Simply use `soundkloud.exe` in the directory.  No need to install.

__Note:__ Windows package is removed temporarily because window location is not correct.

### npm

```sh
$ npm install -g soundkloud
$ soundkloud
```

### Manually

```
$ git clone https://github.com/rhysd/SoundKloud.git && cd SoundKloud
$ npm install -g tsc tsd
$ gem install slim
$ npm install
$ rake run
```

## Usage

After starting SoundKloud, you can find SoundCloud icon in menubar of your desktop.

![menubar](https://raw.githubusercontent.com/rhysd/screenshots/master/SoundKloud/menubar.png)

SoundKloud is integrated with menu.  So you can access the SoundCloud browser as if item of the menu.  Just click it!

At first time, you need to sign in to the page.  Please click "Sign in" in the page.  After that, you need not to login anymore.

If you want to quit this app, please use key shortcut `Control+Q` (`Command+Q` for OS X).

## Customization

You can customize SoundKloud with `{app dir}/config.yml` file.
`{app dir}` is:

OS      | Location
------- | ------------------------------------------
Linux   | `~/.config/SoundKloud`
OS X    | `~/Library/Application Support/SoundKloud`
Windows | Sorry, I don't know

### `icon_type`

You can specify the color of icon in menu bar.  The possible values are `gradient`, `grey` and `white`.  Default value is `gradient`.

### `hot_key`

You can open SoundKloud without away from keyboard using hot key.  Please be careful to choose the hot key because this is a global shortcut.  Default value is `CmdOrCtrl+Shift+S`.  If you want to disable hot key, please specify empty string.

### `flash_plugin`

Value for the `flash_plugin` is an object which has 3 keys `enabled`, `plugin_path` and `plugin_version`.
In some environment, some tracks on SoundCloud may require evil Flash player.  If you want to enable it,

- set `enabled` to `true`,
- set path to your flash player which Chrome uses to `plugin_path`. (The name of flash player binary is "libpepflashplayer.so" for Linux, "PepperFlashPlayer.plugin" for OS X, "pepflashplayer.dll" for Windows)
- set version of your flash player.  You can check it in `chrome://plugins` tab of your Chrome.

### `shortcuts`

You can define shortcuts in SoundKloud.  This is an object of key input and action.  Available actions are `QuitApp`, `Reload`, `GoBack`, `GoForward`, `ScrollDown` and `ScrollUp`.
Of course, you can use `soundcloud.com` website's key shortcuts (`j` for next track, `k` for previous track, and so on).

### `start_page`

You can specify the page shown at start up of this app.  Default value is `https://soundcloud.com`

### Default Config

```yaml
icon_type: "gradient"
hot_key: "CmdOrCtrl+Shift+S"
flash_plugin:
  enabled: false
  plugin_path: ""
  plugin_version: ""
shortcuts:
  "CmdOrCtrl+Q": "QuitApp"
  "CmdOrCtrl+R": "Reload"
start_page: "https://soundcloud.com"
```

## Issues

- Hotkey doesn't work until window is created

## License

    Copyright (c) 2015 rhysd

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
    of the Software, and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
    INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
    PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
    LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
    TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR
    THE USE OR OTHER DEALINGS IN THE SOFTWARE.


