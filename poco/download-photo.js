/* global $, createLogger, replaceImgSrc, downloadImage2 */

/**
 * 比如在这个页面 http://www.poco.cn/works/detail?works_id=5952979
 * 当点击 D 键的时候，自动下载网页中的图片。
 */

$(() => {
  const log = createLogger("poco/download-photo.js");

  log("start");
  log("ready");

  const eventHandler = event => {
    if (event.code === "KeyD") {
      const $img = $(".cc_big_image").find("img");
      // Show the original picture instead of the thumb one

      // When big thumb is not loaded,
      // http://img1001.pocoimg.cn/image/poco/works/04/2016/0524/21/664095602016052421513702_66409560_W120.jpg
      replaceImgSrc("_W120")($img);

      // When big thumb is loaded,
      // http://img1001.pocoimg.cn/image/poco/works/04/2016/0524/21/664095602016052421513702_66409560_H800.jpg
      replaceImgSrc("_H800")($img);

      downloadImage2($img.attr("src"));
    }
  };

  // KeyboardEvent.keyCode
  // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
  document.addEventListener("keyup", eventHandler);

  log("end");
});
