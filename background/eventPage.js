/**
 * The eventPage.js is defined in: https://developer.chrome.com/extensions/event_pages
 * How to send message from content script to extension: https://developer.chrome.com/extensions/messaging
 */

// 这个日志不会打印到网站对应的 console 下，而是会打印到 `_generated_background_page.html` 中。
// chrome-extension://oojgkpcpifcalolijncnlgkcjdoobllj/_generated_background_page.html
const log = (...args) => console.log("[DEBUG]", "[background/eventPage.js]", ...args);

/**
 * Execute a content script
 * @param {Object} request
 * @param {Function} sendResponse
 */
const load = (request, sendResponse) => {
  log("load()", request /*, sendResponse */);

  /**
   * @param {Array} results An array with "the result of the script" from each tab/frame in which the script is run
   * Put below code at the end of script file to define script return result:
   * ```js
   * const result = "jav.sh/init.js loaded";
   * result;
   * ```
   * An example of value of results
   * ```
   * ["jav.sh/init.js loaded"]
   * ```
   * @see https://stackoverflow.com/a/41578299
   */
  const finishExec = results => {
    log("load()", request, "finishExec()", results);
    const lastError = chrome.runtime.lastError;
    log("load()", request, "finishExec()", "lastError:", lastError, JSON.stringify(lastError));
    if (lastError) {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        log("load()", "tabs:", tabs);
        var activeTab = tabs[0];
        if (activeTab) {
          // Sanity check
          log("load()", "tab: " + activeTab.id + " lastError: " + JSON.stringify(lastError));
          // An example of lastError:
          // {"message":"Failed to load file: \"vr.autohome.com.cn/init.js\". "}
        }
      });
      sendResponse({
        error: new Error("eventPage.js failed to load file"),
        lastError,
        "executeScript() => results": results
      });
    } else {
      // null means file loaded successfully
      sendResponse({
        "executeScript() => results": results
      });
    }
  };

  // chrome.tabs.executeScript(integer tabId, object details, function callback)
  // Passing tabId as null will excute only in active tab.
  chrome.tabs.executeScript(null, { file: request.file }, finishExec);
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // Must call `sendResponse()` at the end. Otherwise you will see this error message:
  // Unchecked runtime.lastError: The message port closed before a response was received.
  log("chrome.runtime.onMessage.addListener()", request, sender, sendResponse);
  log(
    "chrome.runtime.onMessage.addListener()",
    sender.tab ? "from a content script:" + sender.tab.url : "from the extension"
  );

  if (request.greeting === "hello") {
    log("chrome.runtime.onMessage.addListener()", "Try to download:", request.url);
    // https://developer.chrome.com/extensions/downloads
    const result = chrome.downloads.download({
      url: request.url
    });
    sendResponse({ farewell: "goodbye", foo: request.url, result });
  }

  // load files
  if (request.action === "load") {
    // load("utils/logger.js");
    // load("utils/utils.js"); // Uncaught SyntaxError: Identifier 'replaceImgSrc' has already been declared
    load(request, sendResponse);
  }

  return true;
});

log("loaded.");
