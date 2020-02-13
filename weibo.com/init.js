/* global $, createLogger, downloadImage2,wrapImagesWithDownloadBtn */

(() => {
  const log = createLogger("weibo.com/init.js");

  log("start");

  const icon = chrome.runtime.getURL("detail.tmall.com/download.png");

  /**
   * 下载当前以大图模式展示的图片
   */
  const _downloadImage = () => {
    const $img = $(".photo_pic > #photo_pic > #pic");
    if ($img.length > 0) {
      // 在大图模式下找到大图，并下载
      const imgFullUrl = $img.attr("src");
      downloadImage2(imgFullUrl);
    }
  };

  const _showDownloadButton = () => {
    const _download = src => {
      downloadImage2(
        src.replace("orj360", "large") // 小缩略图网址替换为完整网址
      );
    };
    wrapImagesWithDownloadBtn(true, icon, _download, document.querySelectorAll(".WB_media_wrap .media_box img"));
  };

  const eventHandler = event => {
    switch (event.code) {
      case "KeyD":
        _downloadImage();
        break;
      case "KeyR":
        _showDownloadButton();
        break;
      default:
        break;
    }
  };

  // KeyboardEvent.keyCode
  // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
  document.addEventListener("keyup", eventHandler);
})();
