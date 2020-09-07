/* global $, createLogger, downloadImage2 */

/**
 * 在当前大图模式下，点击“Enter”或者“D”，下载原始图片。
 */

(() => {
  const log = createLogger("tieba.baidu.com/init.js");

  log("start");

  /**
   * 下载当前以大图模式展示的图片
   */
  const _downloadImage = () => {
    const $img = $(".image_original_original");
    if ($img.length > 0) {
      // 在大图模式下找到大图，并下载
      const imgFullUrl = $img.attr("src");
      downloadImage2(imgFullUrl);
    } else {
      log("Image element not found!");
    }
  };

  const eventHandler = event => {
    log("Key event:", event.code);
    switch (event.code) {
      case "Enter":
      case "KeyD":
        _downloadImage();
        break;
      default:
        break;
    }
  };

  // KeyboardEvent.keyCode
  // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
  document.addEventListener("keyup", eventHandler);
})();
