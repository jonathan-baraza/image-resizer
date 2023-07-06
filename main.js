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

//Mac behaves differently so you have to close the app when all windows are closed
app.on("window-all-closed", () => {
  if (isMac) {
    app.quit();
  }
});
