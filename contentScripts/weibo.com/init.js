/* global $, createLogger, downloadImage2,wrapImagesWithDownloadBtn */

/**
 * 在当前大图模式下，点击“Enter”或者“D”，下载原始图片。
 * 在？？下，点击“R”，在所有图片上显示下载按钮。
 */

(() => {
  const log = createLogger("weibo.com/init.js");

  log("start");

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
    wrapImagesWithDownloadBtn(true, _download, document.querySelectorAll(".WB_media_wrap .media_box img"));
  };

  const eventHandler = event => {
    switch (event.code) {
      case "Enter":
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

  // Put a list thumbnails on the top of big image
  // $("<style>.pic_choose_box.carousel { top: 0px; }</style>").appendTo("head");
})();
