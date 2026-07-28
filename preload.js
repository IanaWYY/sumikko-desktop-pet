const { ipcRenderer } = require('electron');

window.electronAPI = {
  moveWindow: (delta) => ipcRenderer.send('window-move', delta),
  setIgnoreMouseEvents: (ignore, options) => ipcRenderer.send('set-ignore-mouse-events', ignore, options),
  hideWindow: () => ipcRenderer.send('hide-window'),
  showWindow: () => ipcRenderer.send('show-window'),
  quitApp: () => ipcRenderer.send('quit-app')
};
