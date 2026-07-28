const { app, BrowserWindow, ipcMain, Tray, Menu, globalShortcut, screen } = require('electron');
const path = require('path');

let mainWindow = null;
let tray = null;

function enforceAlwaysOnTop() {
  if (!mainWindow || mainWindow.isDestroyed()) return;
  const level = process.platform === 'win32' ? 'screen-saver' : 'floating';
  mainWindow.setAlwaysOnTop(true, level);
}

function createWindow() {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  mainWindow = new BrowserWindow({
    width: 280,
    height: 280,
    x: width - 300,
    y: height - 300,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    hasShadow: false,
    skipTaskbar: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile('index.html');

  enforceAlwaysOnTop();
  mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });

  mainWindow.once('ready-to-show', () => {
    enforceAlwaysOnTop();
    mainWindow.show();
  });
  mainWindow.on('blur', enforceAlwaysOnTop);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function createTray() {
  try {
    tray = new Tray(path.join(__dirname, 'assets', 'tray_icon.png'));
  } catch (e) {}

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Sumikko Gurashi Pet v1.0', enabled: false },
    { type: 'separator' },
    {
      label: 'Show / Hide Pet',
      accelerator: 'CommandOrControl+Shift+P',
      click: () => toggleWindow()
    },
    {
      label: 'Reset Position',
      click: () => resetPosition()
    },
    { type: 'separator' },
    {
      label: 'Quit Pet',
      click: () => app.quit()
    }
  ]);

  if (tray) {
    tray.setToolTip('Sumikko Gurashi Pixel Pet');
    tray.setContextMenu(contextMenu);
    tray.on('click', () => toggleWindow());
  }
}

function toggleWindow() {
  if (!mainWindow) return;
  if (mainWindow.isVisible()) {
    mainWindow.hide();
  } else {
    mainWindow.show();
    mainWindow.focus();
    enforceAlwaysOnTop();
  }
}

function resetPosition() {
  if (!mainWindow) return;
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;
  mainWindow.setPosition(width - 300, height - 300);
  mainWindow.show();
  enforceAlwaysOnTop();
}

app.whenReady().then(() => {
  createWindow();
  createTray();

  globalShortcut.register('CommandOrControl+Shift+P', () => {
    toggleWindow();
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('window-move', (event, { mouseX, mouseY }) => {
  if (!mainWindow) return;
  const [winX, winY] = mainWindow.getPosition();
  mainWindow.setPosition(winX + mouseX, winY + mouseY);
});

ipcMain.on('set-ignore-mouse-events', (event, ignore, options) => {
  if (!mainWindow) return;
  mainWindow.setIgnoreMouseEvents(ignore, options);
});

ipcMain.on('hide-window', () => {
  if (mainWindow) mainWindow.hide();
});

ipcMain.on('show-window', () => {
  if (mainWindow) {
    mainWindow.show();
    enforceAlwaysOnTop();
  }
});

ipcMain.on('quit-app', () => {
  app.quit();
});
