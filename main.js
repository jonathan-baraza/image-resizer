const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const path = require("path");
const { versions } = require("process");
const isMac = process.platform === "darwin";
const isDev = process.env.NODE_ENV !== "production";

//create the main window
function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: "Image Resizer",
    width: isDev ? 1000 : 500,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  //open dev tools if in dev environment
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.loadFile(path.join(__dirname, "./renderer/index.html"));
}

//create About window
function createAboutWindow() {
  const aboutWindow = new BrowserWindow({
    title: "About",
    height: 300,
    width: 300,
  });
  aboutWindow.removeMenu();
  aboutWindow.loadFile(path.join(__dirname, "./renderer/about.html"));
}

//App is ready
app
  .whenReady()
  .then(() => {
    createMainWindow();
    //implement menu
    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu);

    //just making sure the window gets created when the app is activated.
    app.on("activate", () => {
      if (BrowserWindow.getAllWindows.length === 0) {
        createMainWindow();
      }
    });
  })
  .catch((e) => {
    console.log("error");
    console.log(error);
  });

//Menu template
const menu = [
  // {
  //   label: "File",
  //   submenu: [
  //     {
  //       label: "Quit",
  //       click: () => app.quit(),
  //       accelerator: "Ctrl+w",
  //     },
  //   ],
  // },
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [{ label: "About" }],
        },
      ]
    : []),
  {
    role: "fileMenu",
  },
  ...(!isMac
    ? [
        {
          label: "Help",
          submenu: [
            {
              label: "About",
              click: () => createAboutWindow(),
            },
          ],
        },
      ]
    : []),
];

//Respond to ipcRenderer resize
ipcMain.on("image:resize", (e, options) => {
  console.log("options");
  console.log(options);
});

//Mac behaves differently so you have to close the app when all windows are closed
app.on("window-all-closed", () => {
  if (isMac) {
    app.quit();
  }
});
