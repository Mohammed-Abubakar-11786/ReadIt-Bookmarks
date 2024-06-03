// This file is required by the index.html file and will
// be executed in the renderer process for that window.

const { ipcRenderer } = require("electron");
const items = require("./items");

// All of the Node.js APIs are available in this process.
let addBtn = document.getElementById("add-modal"),
  url = document.getElementById("newURL"),
  model = document.getElementById("model"),
  cancelBtn = document.getElementById("close-model"),
  addItem = document.getElementById("add-item");
search = document.getElementById("search");

//toggleFunc
let toggleModelBtn = () => {
  if (addItem.disabled === true) {
    addItem.disabled = false;
    addItem.innerText = "Add Item";
    addItem.style.opacity = "1";
    cancelBtn.style.display = "inline";
  } else {
    addItem.disabled = true;
    addItem.innerText = "Adding....";
    addItem.style.opacity = "0.3";
    cancelBtn.style.display = "none";
  }
};

addBtn.addEventListener("click", () => {
  model.style.display = "flex";
  url.focus();
});

cancelBtn.addEventListener("click", () => {
  model.style.display = "none";
});

addItem.addEventListener("click", () => {
  if (url.value) {
    ipcRenderer.send("new-item", url.value);
    toggleModelBtn();
  }
});

//item-success event listner
ipcRenderer.on("item-added-sucess", (e, data) => {
  url.value = "";
  model.style.display = "none";
  //   console.log(data);
  toggleModelBtn();
  items.addItem(data, true);
});

//listen msg from main process to open addbtn
ipcRenderer.on("open-add-Btn", () => {
  model.style.display = "flex";
  url.focus();
});

//listen for opening item
ipcRenderer.on("open-selected-item", () => {
  items.open();
});

//listen for delting item
ipcRenderer.on("del-selected-item", () => {
  let selecedItem = items.getSelectedItem();
  items.delete(selecedItem.index);
});

//listern for open in browser
ipcRenderer.on("open-selected-in-browser", () => {
  items.open(true);
});

//listern for search feild from menu
ipcRenderer.on("focus-search", () => {
  search.focus();
});

url.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    addItem.click();
  }
});

search.addEventListener("keyup", (e) => {
  Array.from(document.getElementsByClassName("read-items")).forEach((item) => {
    let hasMatch = item.innerText
      .toLowerCase()
      .includes(search.value.toLowerCase());
    item.style.display = hasMatch ? "flex" : "none";
  });
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowUp" || e.key === "ArrowDown")
    items.changeSelection(e.key);
});
