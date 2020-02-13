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

  log("init.js");
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
    log("loadProcessScripts", file);
    // eventPage.js
    chrome.runtime.sendMessage({ action: "load", file }, function(response) {
      log("chrome.runtime.sendMessage", response);
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
    const file = `${location.hostname}/init.js`;
    loadProcessScripts(file);
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

  // Load init scripts of the current website
  loadInitScriptByHostname();
});

console.log("init.js loaded.");