/* global $, createLogger, replaceImgSrc, originalImage, downloadImage2 */
/* global wrapDownloadButtonToImage, wrapImagesWithDownloadBtn, setOriginalImageUrl */
/* global triggerClick */

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

  const processProductReview = () => {
    // revbd => review body
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

      wrapDownloadButtonToImage(img, downloadImage2);
    });
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
    ArrowRight: turnToNextPage
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
