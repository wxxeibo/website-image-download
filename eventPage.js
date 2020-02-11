/**
 * The devetPage.js is defined in: https://developer.chrome.com/extensions/event_pages
 * How to send message from content script to extension: https://developer.chrome.com/extensions/messaging
 */

// 这个日志不会打印到网站对应的 console 下，而是会打印到 `_generated_background_page.html` 中。
// chrome-extension://oojgkpcpifcalolijncnlgkcjdoobllj/_generated_background_page.html
const log = (...args) => console.log("[eventPage.js]", ...args);

log("eventPage.js loaded.");

const load = (file, callback) => {
  log("load", file, callback);

  chrome.tabs.executeScript(null, { file }, result => {
    log("chrome.tabs.executeScript() =>", result);
    const lastError = chrome.runtime.lastError;
    if (lastError) {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var activeTab = tabs[0];
        if (activeTab) {
          // Sanity check
          log("tab: " + activeTab.id + " lastError: " + JSON.stringify(lastError));
        }
      });
      callback(lastError);
    }
  });
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // Must call `sendResponse()` at the end. Otherwise you will see this error message:
  // Unchecked runtime.lastError: The message port closed before a response was received.
  log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
  if (request.greeting === "hello") {
    log("Try to download:", request.url);
    // https://developer.chrome.com/extensions/downloads
    const result = chrome.downloads.download({
      url: request.url
    });
    sendResponse({ farewell: "goodbye", foo: request.url, result });
  }

  // load files
  if (request.action === "load") {
    // load("logger.js");
    // load("utils.js"); // Uncaught SyntaxError: Identifier 'replaceImgSrc' has already been declared
    load(request.file, error => {
      if (error) {
        sendResponse(new Error("Failed to load file"));
      } else {
        sendResponse(null);
      }
    });
  }

  return true;
});
