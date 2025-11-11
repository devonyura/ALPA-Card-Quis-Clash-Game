const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  minimize: () => ipcRenderer.send("minimize-window"),
  // updateWindowSize: (size) => ipcRenderer.send("update-window-size", size),
});
