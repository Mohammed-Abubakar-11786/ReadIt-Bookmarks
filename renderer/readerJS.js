let readitCloseBtn = document.createElement("div");
readitCloseBtn.innerText = "Done";

readitCloseBtn.style.position = "fixed";
readitCloseBtn.style.bottom = "15px";
readitCloseBtn.style.right = "15px";
readitCloseBtn.style.padding = "5px 10px";
readitCloseBtn.style.fontSize = "20px";
readitCloseBtn.style.fontWeight = "bold";
readitCloseBtn.style.backgroundColor = "dodgerblue";
readitCloseBtn.style.color = "white";
readitCloseBtn.style.borderRadius = "5px";
readitCloseBtn.style.cursor = "pointer";
readitCloseBtn.style.boxShadow = "2px 2px 2px rgba(0,0,0,0.2)";
readitCloseBtn.style.zIndex = "9999";

readitCloseBtn.onclick = (e) => {
  console.log("Abu");
  //message parent opener window
  window.opener.postMessage(
    {
      action: "delete-reader-item",
      itemIndex: "{{index}}",
    },
    "*"
  );
};

document.getElementsByTagName("body")[0].append(readitCloseBtn);
