const { error } = require("console");
const { app, BrowserWindow } = require("electron");
const path = require("path");
const isMac = process.platform === "darwin";

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: "Image Resizer",
    width: 500,
    height: 600,
  });

  mainWindow.loadFile(path.join(__dirname, "./renderer/index.html"));
}

app
  .whenReady()
  .then(() => {
    createMainWindow();

    app.on("activate", () => {});
  })
  .catch((e) => {
    console.log("error");
    console.log(error);
  });

app.on("window-all-closed", () => {
  if (isMac) {
    app.quit();
  }
});
