/* global $, downloadImage2, createLogger */

(() => {
  const log = createLogger("photo.weibo.com/init.js");

  log("start");

  const eventHandler = event => {
    if (event.code === "KeyD") {
      log("D pressed");

      const $img = $("img#bigImg");

      downloadImage2($img.attr("src").replace("mw690", "large"));
    }
  };

  // KeyboardEvent.keyCode
  // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
  document.addEventListener("keyup", eventHandler);
})();
