/* global $, createLogger, downloadImage2, wrapImagesWithDownloadBtn */

// This script will be runned by chrome.tabs.executeScript in eventPage.js

(function main() {
  const disabled = false;
  const log = createLogger("detail.tmall.com/init.js");

  if (disabled) {
    return;
  }

  log("start");

  const icon = chrome.runtime.getURL("detail.tmall.com/download.png");

  const load = () => {
    const disableObserver = true;
    if (disableObserver) {
      return;
    }
    observer.observe(document.body, { childList: true, subtree: true });
  };

  /**
   * When DOM changes, process all the images.
   */
  const observer = new MutationObserver(function(mutationsList) {
    for (var i = 0; i < mutationsList.length; i++) {
      var mutation = mutationsList[i];
      if (mutation.addedNodes && mutation.addedNodes.length > 0) {
        for (var j = 0; j < mutation.addedNodes.length; j++) {
          var tmp = mutation.addedNodes[j];
          if (tmp.nodeType === Node.ELEMENT_NODE) {
            var type = tmp.getAttribute("type");
            if (!type || (type && type.indexOf("DFI-BUTTON") === -1)) {
              const updateImages = document.querySelectorAll("#description img");

              // Put the original image src in the data attribute, so the downloader could download the original images.
              $("#description img").each((index, $img) => {
                $img.data("xx-original-src", $img.attr("src").replace("_430x430q90.jpg", ""));
              });

              wrapImagesWithDownloadBtn(true, icon, _downloadImage, updateImages);
            }
          }
        }
      }
    }
  });

  const _downloadImage = src => {
    downloadImage2(
      src.replace("_430x430q90.jpg", "") // 天猫左上角预览图
    );
  };

  // var contentLoaded = function () {
  //   debugger;
  //   // background.send("load", {});
  //
  //   document.removeEventListener("DOMContentLoaded", contentLoaded, false);
  // };
  //
  // debugger;
  // document.addEventListener("DOMContentLoaded", contentLoaded, false);
  load();

  const turnToNextPage = () => {
    const $a = $(".rate-paginator>a:last-child");
    $a.on("click", e => {
      console.log("turnToNextPage", e);
    });
    $a.click(); // not works
    $a.mousedown(); // not works
    $a.get(0) && $a.get(0).click(); // works

    // const $img = $("#imgPhoto");
    // if ($img.length > 0) {
    //   // 在大图模式下找到大图，并下载
    //   const imgFullUrl = $img.attr("src").replace("_500", "");
    //   downloadImage2(imgFullUrl);
    // }
  };

  const eventHandler = event => {
    log("eventHandler", event, event.code);

    switch (event.code) {
      case "KeyR":
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
        break;
      case "KeyT":
        // Remove the download button
        wrapImagesWithDownloadBtn(false, icon, _downloadImage, document.querySelectorAll("#description img"));
        break;
      case "ArrowRight": {
        log("ArrowRight pressed");
        turnToNextPage();

        break;
      }
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
const result = "detail.tmall.com loaded";
result;
