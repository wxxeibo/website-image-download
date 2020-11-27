/* global dataAttrFlag */
/* global $, createLogger, downloadImage2, wrapImagesWithDownloadBtn, originalImage */
/* global replaceImgSrc, wrapDownloadButtonToImage, setOriginalImageUrl */
/* global triggerClick */

// This script will be runned by chrome.tabs.executeScript in eventPage.js

(function main() {
  // Constants
  const disabled = false;

  let log = console.log;
  try {
    log = createLogger("detail.tmall.com/init.js");
  } catch (error) {
    console.error("failed to create logger, error:", error);
    alert("failed to create logger");
    return;
  }

  if (disabled) {
    return;
  }

  log("start");

  const load = () => {
    const disableObserver = true;
    if (disableObserver) {
      return;
    }
    observer.observe(document.body, { childList: true, subtree: true });
  };

  const processProductReview = () => {
    log("processProductReview()");

    const imgUrls = [];

    // Iterate each img in product review
    $(".tm-m-photos-thumb img").each((key, img) => {
      log("Process image:", img);
      const $img = $(img);

      if (!$img.attr(dataAttrFlag)) {
        // "//img.alicdn.com/bao/uploaded/i1/O1CN01NjCKv91purdU1nTSd_!!0-rate.jpg_40x40.jpg"
        // "//img.alicdn.com/bao/uploaded/i1/O1CN01NjCKv91purdU1nTSd_!!0-rate.jpg"
        originalImage("_40x40.jpg", "")($img);
        replaceImgSrc("_40x40.jpg", "_400x400.jpg")($img);
      }

      imgUrls.push({
        original: $img.attr(dataAttrFlag),
        thumb400: $img.attr("src")
      });
    });

    // $(".tm-col-master").css("width", "800px"); // 一行展示更多图片
    // $(".tm-rate-reply").remove(); // 删除店主评论文字部分（太占版面了），只看照片。
    //

    // /**
    //  * 删除无用的块，调整块的边距
    //  */
    // // 删除列，比如“颜色分类”
    // $("td.col-meta").remove();
    // // 删除列，比如“买家 ID”
    // $("td.col-author").remove();
    // // 删除块，比如“初次评价”，或者“收货后追加”
    // $("div.tm-rate-tag").remove();
    // // 调整“初次评价”块和“收货后追加”块的边距
    // $("div.tm-rate-premiere").css("padding", "0");
    // $("div.tm-rate-append").css("padding", "0");
    // // 删除顾客评论正文
    // $("div.tm-rate-fulltxt").remove();

    /**
     * Re-layout to make the image review area larger.
     */
    $("#mainwrap")
      .css("width", "1120px")
      .css("margin-left", "0px");
    $(".col-sub").css("display", "none"); // hide left col
    $(".col-extra").css("display", "none"); // hide right col

    /**
     * 将原来的图片列表隐藏，生成新的图片列表
     */

    $("div.rate-grid > table").hide();

    // Re-create root element for photo list
    $(".xx-photo-list").remove();
    $("div.rate-grid").append(
      $("<div/>", {
        // text: "Photo List",
        class: "xx-photo-list",
        // 7x160px=1120px, 7 img in 1 row
        css: { width: "1120px", border: "1px solid" }
      })
    );

    imgUrls.forEach((item, i) => {
      $(".xx-photo-list").append(
        $("<div/>", {
          class: "xx-photo-item",
          css: {
            float: "left",
            position: "relative",
            margin: "5px",
            height: "270px"
          }
        }).append(
          $("<img/>", {
            src: item.thumb400,
            css: { width: "150px", cursor: "pointer" },
            attr: {
              [dataAttrFlag]: item.original
            }
          })
        )
      );
    });

    $(".xx-photo-list img").each((key, img) => {
      wrapDownloadButtonToImage(img, downloadImage2);
    });
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
              setOriginalImageUrl();
              wrapImagesWithDownloadBtn(true, downloadImage2, updateImages);
            }
          }
        }
      }
    }
  });

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

  const turnToPreviousPage = () => {
    triggerClick(".rate-paginator>a:first-child");
    setTimeout(() => {
      processProductReview();
    }, 1000);
  };

  const turnToNextPage = () => {
    triggerClick(".rate-paginator>a:last-child");
    setTimeout(() => {
      processProductReview();
    }, 1000);
  };

  const processProductDetail = () => {
    setOriginalImageUrl();

    // Wrap all images with download button
    wrapImagesWithDownloadBtn(true, downloadImage2, document.querySelectorAll("#description img"));
  };

  const removeDownloadButton = () => {
    // Remove the download button
    wrapImagesWithDownloadBtn(false, downloadImage2, document.querySelectorAll("#description img"));
  };

  const eventCodeProcedureMapping = {
    KeyL: processProductReview,
    ArrowLeft: turnToPreviousPage,
    ArrowRight: turnToNextPage,
    KeyR: processProductDetail,
    KeyT: removeDownloadButton
  };

  const eventHandler = event => {
    log("eventHandler", event, event.code);

    const procedure = eventCodeProcedureMapping[event.code];
    if (!procedure) {
      log("No process for this key.");
      return;
    }

    procedure();
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
