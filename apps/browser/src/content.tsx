import React from "react";
import ReactDOM from "react-dom/client";

import Content from "./content/Content";

document.addEventListener("mouseup", function (event) {
  console.log(event);
  const selectedText = window.getSelection()?.toString().trim();

  // 既存のポップアップを削除
  const existingPopup = document.getElementById("custom-popup");
  if (existingPopup) {
    existingPopup.remove();
  }
  if (selectedText && selectedText.length > 0) {
    displayPopup(event.pageX, event.pageY);
  }
});

function displayPopup(x: number, y: number) {
  // ポップアップを作成
  const popup = document.createElement("div");
  popup.id = "custom-popup";
  popup.style.position = "absolute";
  popup.style.left = `${x}px`;
  popup.style.top = `${y}px`; // 上側に表示
  document.body.appendChild(popup);

  ReactDOM.createRoot(popup).render(
    <React.StrictMode>
      <Content />
    </React.StrictMode>,
  );
}
