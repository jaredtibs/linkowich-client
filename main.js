'use strict';

const { app, BrowserWindow, Menu, Tray, ipcMain } = require('electron')
const path = require('path')
const url = require('url')
const assetsDirectory = path.join(__dirname, '/app/assets');

require('electron-debug')();

//if logged out, login window displays, otherwise tray
let tray
let loginWindow
//let prefsWindow
let mainWindow
let followersWindow

// Don't show the app in the doc
app.dock.hide()

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createTray()
  createMainWindow()
  createFollowersWindow()
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// followersWindow has an onclose listener that preventsDefault
// and only hides the window, this ensures it closes
app.on('before-quit', () => {
    followersWindow.removeAllListeners('close');
    followersWindow.close();
});

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 300,
    height: 450,
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
  mainWindow.loadURL(`file://${path.join(__dirname, 'app/index.html')}`)

  // Hide the window when it loses focus
  mainWindow.on('blur', () => {
    if (!mainWindow.webContents.isDevToolsOpened()) {
      mainWindow.hide()
    }
  })
}

function createFollowersWindow() {
  followersWindow = new BrowserWindow({
    width: 200,
    height: 200,
    show: false,
    frame: true,
    fullscreenable: false,
    resizable: false,
    webPreferences: {
      // Prevents renderer process code from not running when window is
      // hidden
      backgroundThrottling: false
    }
  })
  followersWindow.loadURL(`file://${path.join(__dirname, 'app/followers.html')}`)

  //dont destroy the window when they exit out so they can reopen
  followersWindow.on('close', function (event) {
    followersWindow.hide();
    event.preventDefault();
  })
}

function createTray() {
  tray = new Tray(path.join(assetsDirectory, 'unreadLinkIcon.png'))
  tray.on('right-click', toggleWindow)
  tray.on('double-click', toggleWindow)
  tray.on('click', function (event) {
    toggleWindow()

    // Show devtools when command clicked
    if (mainWindow.isVisible() && process.defaultApp && event.metaKey) {
      mainWindow.openDevTools({mode: 'detach'})
    }
  })
}

function toggleWindow() {
  if (mainWindow.isVisible()) {
    mainWindow.hide()
  } else {
    showMainWindow()
  }
}

function toggleTrayIcon() {
  tray.setImage(path.join(assetsDirectory, 'tmp_icon.png'))
}

function showMainWindow() {
  const position = getWindowPosition()
  mainWindow.setPosition(position.x, position.y, false)
  mainWindow.show()
  mainWindow.focus()
  toggleTrayIcon()
}

function showFollowersWindow() {
  followersWindow.show()
}

function getWindowPosition () {
  const windowBounds = mainWindow.getBounds()
  const trayBounds = tray.getBounds()

  // Center window horizontally below the tray icon
  const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))

  // Position window 4 pixels vertically below the tray icon
  const y = Math.round(trayBounds.y + trayBounds.height + 4)

  return {x: x, y: y}
}

ipcMain.on('show-window', () => {
  showMainWindow()
})

ipcMain.on('open-followers', (event, arg) => {
  //open a new window containing follow/unfollow functionality
  showFollowersWindow()
});

ipcMain.on('links-updated', (event, links) => {
  tray.setImage(path.join(assetsDirectory, 'unreadLinkIcon.png'))
})
