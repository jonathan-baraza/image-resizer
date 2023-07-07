const os = require("os");
const path = require("path");
const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("versions", {
  homedir: () => os.homedir(),
  join: (...args) => path.join(...args),

  //we can also expose variables, not just functions
});
