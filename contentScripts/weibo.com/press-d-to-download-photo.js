/* global $, createLogger, downloadImage2 */

/**
 * 比如在这个页面 https://weibo.com/58351?is_all=1#_rnd1570375242544
 * 当点击 D 键的时候，自动下载网页中的图片。
 */

$(() => {
  const log = createLogger("weibo/download-photo.js");

  log("start");

  const eventHandler = event => {
    if (event.code === "KeyD" || event.code === "KeyP") {
      log("D or P pressed");

      let imgFullUrl = "";

      if ($(".artwork_box").length > 0) {
        log("展开缩略图模式");
        // 因为不断在浏览，所以会有多个缩略图被展开，只取最下面（最后）一张。
        const $img = $(".artwork_box")
          .find("img")
          .last();

        // Show the original picture instead of the thumb one
        // src="//wx2.sinaimg.cn/mw690/005EY2yCly1g4ft8leagcj30ku4staz7.jpg"
        // src="//wx2.sinaimg.cn/large/005EY2yCly1g4ft8leagcj30ku4staz7.jpg"
        // replaceImgSrc("mw690", "large")($img);
        imgFullUrl = $img.attr("src").replace("mw690", "large");
      }

      if ($(".pic_show_box").length > 0) {
        log("查看大图模式");
        const $img = $(".pic_show_box").find("img");

        // replaceImgSrc("mw1024", "large")($img);
        imgFullUrl = $img.attr("src").replace("mw1024", "large");
      }

      if (imgFullUrl === "") {
        log("Not found a photo.");
        return;
      }

      if (event.code === "KeyD") {
        downloadImage2(imgFullUrl);
      } else if (event.code === "KeyP") {
        window.open(imgFullUrl);
      }
    }
  };

  // KeyboardEvent.keyCode
  // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
  document.addEventListener("keyup", eventHandler);

  log("end");
});
