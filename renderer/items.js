const { log } = require("console");
const exp = require("constants");
const { shell } = require("electron");
const fs = require("fs");
let win;

//listern for done
window.addEventListener("message", (e) => {
  if (e.data.action === "delete-reader-item") {
    //delete item
    this.delete(parseInt(e.data.itemIndex));

    //now close window
    e.source.close();
  }
});

let readerJS;
fs.readFile(`${__dirname}/readerJS.js`, (err, data) => {
  readerJS = data.toString();
});

exports.storage = JSON.parse(localStorage.getItem("readit-items")) || [];

exports.delete = (itemIndex) => {
  // items.removeChild(items.childNodes[itemIndex]); //not working in my system
  items.removeChild(items.children[itemIndex]); //alternate
  this.storage.splice(itemIndex, 1);
  //save storage

  this.save();

  if (this.storage.length) {
    let = newselectedIndex = itemIndex === 0 ? 0 : itemIndex - 1;
    console.log("new selected index" + newselectedIndex);
    document
      .getElementsByClassName("read-items")
      [newselectedIndex].classList.add("selected");
  }
};

exports.getSelectedItem = () => {
  let selecedItem = document.getElementsByClassName("read-items selected")[0];

  let child = selecedItem;
  let index = 0;
  while ((child = child.previousElementSibling) != null) index++;

  return {
    node: selecedItem,
    index,
  };
};

exports.save = () => {
  localStorage.setItem("readit-items", JSON.stringify(this.storage));
};

exports.select = (e) => {
  //remove the selected from other items
  this.getSelectedItem().node.classList.remove("selected");

  //add class to the new seleced item
  e.currentTarget.classList.add("selected");
};

exports.open = (inBrowser = false) => {
  if (!this.storage.length) return;
  let selecedItem = this.getSelectedItem();
  let itemUrl = selecedItem.node.dataset.url;
  // console.log("opening : " + itemUrl);
  if (!inBrowser) {
    win = window.open(
      itemUrl,
      "_blank",
      `
      maxWidth=2000,
      maxHeight=2000,
      width=800,
      height=500,
      backgroundColor=#DEDEDE,
      contextIsolation=1,
      nodeIntegration=0,
      openDevTools=1
      `
    );

    win.eval(readerJS.replace("{{index}}", selecedItem.index));
  } else {
    shell.openExternal(itemUrl);
  }
};

exports.addItem = (item, isnew = false) => {
  let newItem = document.createElement("div");
  newItem.setAttribute("class", "read-items");
  newItem.innerHTML = `<img src="${item.screenShort}" alt="">
    <h2>${item.title}</h2>`;
  newItem.setAttribute("data-url", item.url);
  items.appendChild(newItem);

  newItem.addEventListener("click", this.select);
  newItem.addEventListener("dblclick", this.open);

  if (document.getElementsByClassName("read-items").length === 1)
    newItem.classList.add("selected");

  if (isnew) {
    this.storage.push(item);
    this.save();
  }
};

//add items from storage

this.storage.forEach((item) => {
  this.addItem(item, false);
});

exports.changeSelection = (direction) => {
  let currentItem = this.getSelectedItem();
  if (direction === "ArrowUp" && currentItem.node.previousElementSibling) {
    currentItem.node.previousElementSibling.classList.add("selected");
    currentItem.node.classList.remove("selected");
  } else if (direction === "ArrowDown" && currentItem.node.nextElementSibling) {
    currentItem.node.nextElementSibling.classList.add("selected");
    currentItem.node.classList.remove("selected");
  }
};
