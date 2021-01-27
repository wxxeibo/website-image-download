/* global createLogger, $ */

/**
 * File: init.js
 * Description: 当前脚本会运行在所有网站的网页加载阶段，只会被执行一次。
 * Type: Content Scripts
 * Context: Web Pages
 */

/**
 * 当前脚本作为 Content Scripts (https://developer.chrome.com/extensions/content_scripts)
 * 可以访问 `chrome.runtime`。你会发现直接在 Chrome DevTools 的 Console 中，输入
 * `chrome.runtim` 会显示 `undefined`
 */

$(() => {
  const log = createLogger("init.js");

  log("Start checking environment...");
  log("chrome:", chrome, chrome.runtime);
  log("chrome.runtime:", chrome.runtime);
  // log("chrome.tabs.executeScript:", chrome.tabs.executeScript); // undefined
  log("location:", location);
  log("$.fn.jquery:", $.fn.jquery);
  log("End checking environment.");

  /**
   * @param {string} file e.g. process_scripts/www.moko.cc.js
   */
  const loadProcessScripts = file => {
    log("loadProcessScripts(), file:", file);
    // eventPage.js will execute content scripts
    chrome.runtime.sendMessage({ action: "load", file }, function(response) {
      log("chrome.runtime.sendMessage end, file:", file, "response:", response);
      if (response && (response.lastError || response.error)) {
        console.error("Failed to execute content script, file:", file, "response:", response);
        log("init.js failed to load script, file:", file, "error:", response.lastError.message);
      }
    });
  };

  // Load init script of each website
  const loadProcessScriptsOfThisWebsite = () => {
    log("loadProcessScriptsOfThisWebsite()");
    // location.hostname: "www.moko.cc"
    const file = `process_scripts/${location.hostname}.js`;
    loadProcessScripts(file);
  };

  // Load init script of each website
  const loadInitScriptByHostname = () => {
    log("loadInitScriptByHostname()");
    // location.hostname: "www.moko.cc"
    const file = `contentScripts/${location.hostname}/init.js`;
    loadProcessScripts(file);
  };

  /**
   * @param {Function} callback Call it after DB loaded
   * @return {Promise<Object>}
   */
  const loadDb = (callback = () => {}) => {
    // https://dev.to/aussieguy/reading-files-in-a-chrome-extension--2c03
    // Need config "web_accessible_resources" field in manifest.json
    const url = chrome.runtime.getURL("data/jav-db.json");
    return fetch(url)
      .then(response => response.json()) //assuming file contains json
      .then(json => {
        log("db loaded");
        window.db = json;
        callback(json);
        return json;
      });
  };

  const eventHandler = event => {
    switch (event.code) {
      case "KeyL":
        loadProcessScriptsOfThisWebsite();
        break;
    }
  };
  // KeyboardEvent.keyCode
  // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
  document.addEventListener("keyup", eventHandler);

  loadDb(() => {
    // Load init scripts of the current website
    loadInitScriptByHostname();
  });

  log("init.js loaded.");
});
