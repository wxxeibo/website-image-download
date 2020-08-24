/* global $, createLogger, replaceImgSrc, openPopup, wrapDownloadButtonToImage, downloadImage2, originalImage */

(() => {
  if (typeof createLogger !== "function") {
    console.error("[club.autohome.com.cn/init.js] createLogger not defined yet.");
    return;
  }

  const dataAttrFlag = "data-xx-original-src";
  const log = createLogger("club.autohome.com.cn/init.js");

  log("start");
  log("window.location", window.location);

  const icon = chrome.runtime.getURL("detail.tmall.com/download.png");

  const processLPressed = () => {
    openPopup("L Pressed");

    // Loop each img and replace src with original
    $(".x-loaded").each((key, val) => {
      let $div = $(val);
      let img = $div.find("img")[0];
      const $img = $(img);

      if (!$img.attr(dataAttrFlag)) {
        wrapDownloadButtonToImage(img, icon, downloadImage2);

        // Add the original image URL to the data attribute
        // "//club2.autoimg.cn/album/g2/M0B/E7/4B/userphotos/2018/12/11/11/500_ChsEmlwPMD6AEs9sABhthfkAyQ8621.jpg"
        // "//club2.autoimg.cn/album/g2/M0B/E7/4B/userphotos/2018/12/11/11/ChsEmlwPMD6AEs9sABhthfkAyQ8621.jpg"
        originalImage("/500_", "/")($img);
        // Show the original picture instead of the thumb one
        replaceImgSrc("/500_", "/")($img);
      }
    });
  };

  const eventHandler = event => {
    if (event.code === "KeyL") {
      log("L pressed");

      processLPressed();
    }
  };

  // KeyboardEvent.keyCode
  // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
  document.addEventListener("keyup", eventHandler);

  log("end");
})();
