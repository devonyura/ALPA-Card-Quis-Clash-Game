const {
  app,
  BrowserWindow,
  screen,
  ipcMain,
  Tray,
  Menu,
  nativeImage,
} = require("electron");
const path = require("path");

let mainWindow;
let tray;

function createWindow() {
  // Dapatkan ukuran layar utama
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  // Ukuran widget
  const windowWidth = width;
  const windowHeight = height;

  // Buat window di kanan atas
  mainWindow = new BrowserWindow({
    width: windowWidth,
    height: windowHeight,
    x: 0,
    y: 0,
    frame: true, // harus false agar transparan
    transparent: false,
    alwaysOnTop: false,
    resizable: true,
    hasShadow: false,
    skipTaskbar: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
    backgroundColor: "#FFFFFF", // pastikan ini 0 alpha
    autoHideMenuBar: true,
  });

  // Load ke server vite saat development
  // const isDev = !app.isPackaged;
  // if (!isDev) {
  // mainWindow.loadURL("http://localhost:5173");
  // mainWindow.webContents.openDevTools({ mode: "detach" });
  // } else {
  mainWindow.loadFile(path.join(__dirname, "dist", "index.html"));
  // }

  // untuk auto resize window mengikuti component react
  // ipcMain.on("update-window-size", (event, { width, height }) => {
  //   if (mainWindow) {
  //     mainWindow.setSize(Math.ceil(width), Math.ceil(height), true);
  //   }
  // });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

ipcMain.on("minimize-window", () => {
  if (mainWindow) mainWindow.minimize();
});

function createTray() {
  const iconPath = path.join(__dirname, "icon.ico"); // pastikan icon ada
  const trayIcon = nativeImage.createFromPath(iconPath);
  tray = new Tray(trayIcon);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Show Widget",
      click: () => {
        mainWindow.show();
      },
    },
    {
      label: "Hide Widget",
      click: () => {
        mainWindow.hide();
      },
    },
    {
      label: "Exit",
      click: () => {
        app.quit();
      },
    },
  ]);

  tray.setToolTip("My Countdown Widget");
  tray.setContextMenu(contextMenu);

  // klik kiri langsung show/hide
  tray.on("click", () => {
    if (mainWindow.isVisible()) mainWindow.hide();
    else mainWindow.show();
  });
}

app.whenReady().then(() => {
  createTray();
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (mainWindow === null) createWindow();
});
