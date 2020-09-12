/* global dataAttrFlag */
/* global $, createLogger, downloadImage2, wrapDownloadButtonToImage, originalImage, replaceImgSrc */

// This script will be runned by chrome.tabs.executeScript in eventPage.js

(function main() {
  // Constants
  const disabled = false;

  let log = console.log;
  try {
    log = createLogger("market.m.taobao.com/init.js");
  } catch (error) {
    console.error("failed to create logger, error:", error);
    alert("failed to create logger");
    return;
  }

  if (disabled) {
    return;
  }

  log("start");

  const processLPressed = () => {
    // Loop each img and replace src with original
    $("img").each((key, img) => {
      log("Process image:", img);
      const $img = $(img);

      if ($img.attr("lazyload") !== "true") {
        log("is not a photo");
        return;
      }

      wrapDownloadButtonToImage(img, downloadImage2);

      if (!$img.attr(dataAttrFlag)) {
        // Add the original image URL to the data attribute
        // "//gw.alicdn.com/tfscom/O1CN01O5jdy31Qd7p4lsLh1_!!0-rate.jpg_790x10000Q75.jpg_.webp"
        // "//gw.alicdn.com/tfscom/O1CN01O5jdy31Qd7p4lsLh1_!!0-rate.jpg"
        originalImage("_790x10000Q75.jpg_.webp", "")($img);
        // Replace the img src with the original URL
        replaceImgSrc("_790x10000Q75.jpg_.webp", "")($img);
      }
    });
  };

  const eventHandler = event => {
    log("eventHandler", event, event.code);

    switch (event.code) {
      case "KeyL":
        processLPressed();
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

// https://stackoverflow.com/a/41578299
// Defined the return result for chrome.tabs.executeScript
const result = "market.m.taobao.com/init.js loaded";
result;
