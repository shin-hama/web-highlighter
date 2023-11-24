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
  range.surroundContents(elm);
}
