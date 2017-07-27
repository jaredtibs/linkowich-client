'use strict';

const { app, BrowserWindow, Menu, Tray, ipcMain } = require('electron')
const path = require('path')
const url = require('url')
const assetsDirectory = path.join(__dirname, '/app/assets');

const Store = require('electron-store');
const store = new Store();

require('electron-debug')();
require('electron-reload')(__dirname, {
  electron: require('${__dirname}/../../node_modules/electron')
})

let tray
let window

// Don't show the app in the doc
app.dock.hide()

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createTray()
  createWindow()
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

function createWindow () {
  window = new BrowserWindow({
    width: 300,
    height: 500,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    transparent: true,
    webPreferences: {
      // Prevents renderer process code from not running when window is
      // hidden
      backgroundThrottling: false
    }
  })

  //TODO login logic needs to be moved to react
  //this now just loads parent
  //if (store.get('auth_token')) {
  //window.loadURL(`file://${path.join(__dirname, 'app/index.html')}`)
  //} else {
  // window.loadURL(`file://${path.join(__dirname, 'app/login.html')}`)
  //}
  window.loadURL(`file://${path.join(__dirname, '/index.html')}`)

  // Hide the window when it loses focus
  window.on('blur', () => {
    if (!window.webContents.isDevToolsOpened()) {
      window.hide()
    }
  })
}

function createTray() {
  tray = new Tray(path.join(assetsDirectory, 'unreadLinkIcon.png'))
  tray.on('right-click', toggleWindow)
  tray.on('double-click', toggleWindow)
  tray.on('click', function (event) {
    toggleWindow()

    // Show devtools when command clicked
    if (window.isVisible() && process.defaultApp && event.metaKey) {
      window.openDevTools({mode: 'detach'})
    }
  })
}

function toggleWindow() {
  if (window.isVisible()) {
    window.hide()
  } else {
    showWindow()
  }
}

function toggleTrayIcon() {
  tray.setImage(path.join(assetsDirectory, 'tmp_icon.png'))
}

function showWindow() {
  const position = getWindowPosition()
  window.setPosition(position.x, position.y, false)
  window.show()
  window.focus()
  toggleTrayIcon()
}

function getWindowPosition () {
  const windowBounds = window.getBounds()
  const trayBounds = tray.getBounds()

  // Center window horizontally below the tray icon
  const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))

  // Position window 4 pixels vertically below the tray icon
  const y = Math.round(trayBounds.y + trayBounds.height + 4)

  return {x: x, y: y}
}

ipcMain.on('show-window', () => {
  showWindow()
})

ipcMain.on('show-followers', () => {
  window.loadURL(`file://${path.join(__dirname, 'app/followers.html')}`)
})

ipcMain.on('links-updated', (event, links) => {
  tray.setImage(path.join(assetsDirectory, 'unreadLinkIcon.png'))
})

ipcMain.on('login-success', (event, sessionData) => {
  store.set('auth_token', sessionData['token']);
  window.loadURL(`file://${path.join(__dirname, 'app/index.html')}`)
})
