/* global dataAttrFlag */
/* global $, createLogger, replaceImgSrc, openPopup, wrapDownloadButtonToImage, downloadImage2, originalImage */

// Copy from club.autohome.com.cn

(() => {
  if (typeof createLogger !== "function") {
    console.error("[anishikiya.lofter.com/init.js] createLogger not defined yet.");
    return;
  }

  const log = createLogger("anishikiya.lofter.com/init.js");

  log("start");
  log("window.location", window.location);

  const icon = chrome.runtime.getURL("detail.tmall.com/download.png");

  const processLPressed = () => {
    openPopup("L Pressed");

    // Loop each img and replace src with original
    $(".pic img").each((key, img) => {
      const $img = $(img);

      if (!$img.attr(dataAttrFlag)) {
        wrapDownloadButtonToImage(img, icon, downloadImage2, {
          original: /\?imageView.*/,
          full: "",
          thumb: ""
        });
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
