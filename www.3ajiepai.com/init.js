/* global $, downloadHandler, createLogger, downloadImage2 */

(() => {
  const log = createLogger("www.3ajiepai.com/init.js");

  log("start");

  $(".zoom").each((key, img) => {
    log("Process image:", img);

    const $img = $(img);
    // 原来的 onClick 会导致点击图片时候弹出新窗口
    $img.prop("onclick", null).off("click");

    // Click image to download this image
    $img.click(downloadHandler);
  });

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
