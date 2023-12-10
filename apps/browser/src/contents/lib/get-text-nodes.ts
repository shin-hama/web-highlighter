export function getTextNodesInRange(range: Range) {
  const textNodes = [];
  let node;

  const walker = document.createTreeWalker(
    range.commonAncestorContainer,
    NodeFilter.SHOW_TEXT,
    function (node) {
      return range.intersectsNode(node)
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT;
    },
  );

  while ((node = walker.nextNode())) {
    if (node.textContent?.trim() !== "") {
      textNodes.push(node);
    }
  }

  return textNodes;
}

export function getTextNodesInOneElement(elm: Element) {
  const range = document.createRange();
  range.setStart(elm, 0);
  range.setEnd(elm, elm.childNodes.length);

  return getTextNodesInRange(range);
}
