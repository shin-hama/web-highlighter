import { sendToContentScript } from "@plasmohq/messaging";

export function createMarker(
  node: Node,
  color: string,
  position?: { start?: number; end?: number },
) {
  const range = document.createRange();
  range.selectNodeContents(node);
  if (position?.start) {
    range.setStart(node, position.start);
  }
  if (position?.end) {
    range.setEnd(node, position.end);
  }

  const elm = document.createElement("span");
  elm.style.backgroundColor = color;
  elm.style.borderRadius = "2px";
  elm.style.padding = "2px 2px";
  elm.style.margin = "0 1px";

  elm.addEventListener("click", (event) => {
    // Prevent the event from bubbling up
    event.stopPropagation();

    // Send the event to your extension
    chrome.runtime
      .sendMessage({
        type: "WebHighlighter:MarkerClicked",
        data: {
          id: "chrome",
        },
      })
      .then(console.log)
      .catch(console.error);
    sendToContentScript({
      name: "plasmo:WebHighlighter:MarkerClicked",
      body: {
        id: "plasmo",
      },
    })
      .then(console.log)
      .catch(console.error);
  });

  range.surroundContents(elm);
}
