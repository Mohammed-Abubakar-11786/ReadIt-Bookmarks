const { BrowserWindow } = require("electron");
module.exports = (url, callback) => {
  let offscreenWindow = new BrowserWindow({
    width: 500,
    height: 500,
    show: false,
    webPreferences: {
      offscreen: true,
    },
  });

  offscreenWindow.loadURL(url);

  offscreenWindow.webContents.on("did-finish-load", () => {
    let title = offscreenWindow.getTitle();
    offscreenWindow.webContents.capturePage().then((img) => {
      let screenShort = img.toDataURL();
      callback({ title, screenShort, url });
      offscreenWindow.close();
      offscreenWindow = null;
    });
  });
};
