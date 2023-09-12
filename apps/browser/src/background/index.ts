/**
 * listen to change events to cookies
 */
chrome.cookies.onChanged.addListener((e) => {
  console.log(e);
  /** @type{string} 'expired', 'explicit' or 'override' */
  console.log(e.cause);

  /** @type{Object} */
  console.log(e.cookie);

  /** @type{boolean} if the change event has got triggered by "removing a cookie" */
  console.log(e.removed);
});
