/* global $, createLogger, replaceImgSrc, originalImage, downloadImage2, wrapDownloadButtonToImage */

(function main() {
  const disabled = false;
  const log = createLogger("item.taobao.com/init.js");

  if (disabled) {
    return;
  }

  log("start");

  const icon = chrome.runtime.getURL("detail.tmall.com/download.png");

  // Run this when L key pressed
  const lKeyPressed = () => {
    /*
    // Put the original image src in the data attribute, so the downloader could download the original images.
    $("#description img").each((index, img) => {
      // TODO 为什么通过 jQuery 没有成功将 data-* 属性设置到元素上？
      $(img).data(
        "xx-original-src",
        $(img)
          .attr("src")
          .replace("_430x430q90.jpg", "")
      );
      img.setAttribute(
        "data-xx-original-src",
        $(img)
          .attr("src")
          .replace("_430x430q90.jpg", "")
      );
    });
    // Wrap all images with download button
    wrapImagesWithDownloadBtn(true, icon, _downloadImage, document.querySelectorAll("#description img"));
    */

    $(".tb-revbd .review-details img").each((key, img) => {
      log("Process image:", img);

      const $img = $(img);

      // Add the original image src to the data attribute for downloading
      originalImage("_40x40.jpg", "")($img);

      // Larger thumbnails
      // "//img.alicdn.com/imgextra/i3/0/O1CN01BbjcH32J9AtC6S93d_!!0-rate.jpg_40x40.jpg"
      // "//img.alicdn.com/imgextra/i3/0/O1CN01BbjcH32J9AtC6S93d_!!0-rate.jpg_400x400.jpg"
      replaceImgSrc("_40x40.jpg", "_400x400.jpg")($img);

      // 图片不要太大了
      $img.css("width", "150px");
      $img.css("height", "auto");

      wrapDownloadButtonToImage(img, icon, downloadImage2);
    });
  };

  const eventHandler = event => {
    log("eventHandler", event, event.code);

    switch (event.code) {
      case "KeyL":
        lKeyPressed();
        break;

      default:
        log("No process for this key.");
        break;
    }
  };

  // KeyboardEvent.keyCode
  // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
  document.addEventListener("keyup", eventHandler);

  log("end");
}());