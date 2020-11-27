/* global $ */

// logger.js
/* global createLogger */
// download.js
/* global downloadImage2 */
// utils.js
/* global setOriginalImageUrl, triggerClick, eventHandlerGenerator, getImages */
// ui.js
/* global wrapImagesWithDownloadBtn, createPhotoList */

(function main() {
  const disabled = false;
  const log = createLogger("item.taobao.com/init.js");

  if (disabled) {
    return;
  }

  log("start");

  const processProductDetail = () => {
    setOriginalImageUrl();

    // Wrap all images with download button
    wrapImagesWithDownloadBtn(true, downloadImage2, document.querySelectorAll("#description img"));
  };

  // const processProductReview = () => {
  //   // revbd => review body
  //   $(".tb-revbd .review-details img").each((key, img) => {
  //     log("Process image:", img);
  //
  //     const $img = $(img);
  //
  //     // Add the original image src to the data attribute for downloading
  //     originalImage("_40x40.jpg", "")($img);
  //
  //     // Larger thumbnails
  //     // "//img.alicdn.com/imgextra/i3/0/O1CN01BbjcH32J9AtC6S93d_!!0-rate.jpg_40x40.jpg"
  //     // "//img.alicdn.com/imgextra/i3/0/O1CN01BbjcH32J9AtC6S93d_!!0-rate.jpg_400x400.jpg"
  //     replaceImgSrc("_40x40.jpg", "_400x400.jpg")($img);
  //
  //     // 图片不要太大了
  //     $img.css("width", "150px");
  //     $img.css("height", "auto");
  //
  //     wrapDownloadButtonToImage(img, downloadImage2);
  //   });
  // };

  const processProductReview = () => {
    log("processProductReview()");

    const imgUrls = getImages(".tb-revbd .review-details img");

    /**
     * Re-layout to make the image review area larger.
     */
    // class="layout grid-s5m0 tb-main-layout"
    $(".layout.grid-s5m0.tb-main-layout")
      // .css("width", "1340px")
      .css("margin-left", "0px");
    // class="main-wrap  J_TRegion"
    $(".main-wrap.J_TRegion")
      .css("width", "100%")
      .css("margin-left", "0px");
    $(".col-sub.tb-shop.J_TRegion").css("display", "none"); // hide left col
    $(".col-extra.tb-desc-segments-list-sticky").css("display", "none"); // hide right col

    /**
     * 将原来的图片列表隐藏，生成新的图片列表
     */
    $("div.tb-revbd > ul").hide();

    createPhotoList("div.tb-revbd", imgUrls, downloadImage2);

    // tmp fix layout
    $(".kg-rate-alert.type-attention.tb-tbcr-mt").css("position", "fixed");
  };

  const loadLargePic = () => {
    // 1. In product detail, wrap images with download buttons
    processProductDetail();
    // 2. In product review, wrap images with download buttons
    processProductReview();
  };

  const turnToPreviousPage = () => {
    triggerClick("li.pg-prev");
    setTimeout(() => {
      processProductReview();
    }, 1000);
  };

  const turnToNextPage = () => {
    triggerClick("li.pg-next");
    setTimeout(() => {
      processProductReview();
    }, 1000);
  };

  const eventCodeProcedureMapping = {
    KeyL: loadLargePic,
    ArrowLeft: turnToPreviousPage,
    ArrowRight: turnToNextPage,
    KeyR: processProductDetail
  };

  // KeyboardEvent.keyCode
  // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
  document.addEventListener("keyup", eventHandlerGenerator(eventCodeProcedureMapping));

  // Blur the radio button to avoid choosing radio button when click arrow key
  $("#J_TabBar")
    .children("li")
    .eq(1)
    .click(() => {
      setTimeout(() => {
        $("#reviews-t-val3").click(() => {
          setTimeout(() => {
            $("#reviews-t-val3").blur();
          }, 200);
        });
      }, 1000);
    });

  log("end");
}());
