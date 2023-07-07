const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("versions", {
  node: () => process.version.node,
  chrome: () => process.version.chrome,
  electron: () => process.version.electron,
  //we can also expose variables, not just functions
});
