/* global $, createLogger, downloadImage2 */

(() => {
  const log = createLogger("weibo.com/init.js");

  log("start");

  const eventHandler = event => {
    if (event.code === "KeyD") {
      log("D pressed");

      const $img = $(".photo_pic > #photo_pic > #pic");
      if ($img.length > 0) {
        // 在大图模式下找到大图，并下载
        const imgFullUrl = $img.attr("src");
        downloadImage2(imgFullUrl);
      }
    }
  };

  // KeyboardEvent.keyCode
  // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
  document.addEventListener("keyup", eventHandler);
})();
