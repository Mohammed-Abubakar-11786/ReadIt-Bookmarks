//module
const { Menu, shell, Accelerator } = require("electron");

module.exports = (appWin) => {
  let template = [
    {
      label: "Items",
      submenu: [
        {
          label: "Add New",
          accelerator: "CmdOrCtrl+O",
          click: () => {
            appWin.send("open-add-Btn");
          },
        },
        {
          label: "Open Selected Item",
          accelerator: "CmdOrCtrl+enter",
          click: () => {
            appWin.send("open-selected-item");
          },
        },
        {
          label: "Delete Item",
          accelerator: "CmdOrCtrl+backspace",
          click: () => {
            appWin.send("del-selected-item");
          },
        },
        {
          label: "Open in Browser",
          accelerator: "CmdOrctrl+Shift+Enter",
          click: () => {
            appWin.send("open-selected-in-browser");
          },
        },
        {
          label: "Search",
          accelerator: "CmdOrCtrl+S",
          click: () => {
            appWin.send("focus-search");
          },
        },
      ],
    },
    {
      role: "editMenu",
    },
    {
      role: "windowMenu",
    },
    {
      role: "help",
      submenu: [
        {
          label: "Learn More",
          click: () => {
            shell.openExternal(
              "https://github.com/stackacademytv/master-electron"
            );
          },
        },
      ],
    },
  ];

  if (process.platform === "darwin") template.unshift({ role: "appMenu" });
  let menu = new Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};
