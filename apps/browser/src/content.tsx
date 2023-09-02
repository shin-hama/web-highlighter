import React from "react";
import ReactDOM from "react-dom/client";

document.addEventListener("mouseup", function (event) {
  console.log(event);
  const selectedText = window.getSelection()?.toString().trim();

  console.log(selectedText);
  if (selectedText && selectedText.length > 0) {
    displayPopup(event.clientX, event.clientY, selectedText);
  }
});

function displayPopup(x: number, y: number, text: string) {
  // 既存のポップアップを削除
  const existingPopup = document.getElementById("custom-popup");
  if (existingPopup) {
    existingPopup.remove();
  }

  // ポップアップを作成
  const popup = document.createElement("div");
  popup.id = "custom-popup";
  popup.textContent = text;
  popup.style.left = `${x}px`;
  popup.style.top = `${y - 30}px`; // 上側に表示
  popup.style.position = "absolute";
  document.body.appendChild(popup);
}

const root = document.createElement("div");
root.id = "crx-root";
document.body.appendChild(root);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <div className="absolute">test</div>
  </React.StrictMode>,
);
