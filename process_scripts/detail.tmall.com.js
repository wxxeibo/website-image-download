/* global $, replaceImgSrc, originalImage, createLogger, wrapDownloadButtonToImage, downloadImage2 */

/**
 * File: detail.tmall.com.js
 * Description: 将网页中的缩略图放大
 * 会被执行多次
 */

(() => {
  const log = createLogger("process_scripts/detail.tmall.com.js");
  log("start");

  const icon = chrome.runtime.getURL("detail.tmall.com/download.png");
  const imgUrls = [];

  $(".tm-m-photos-thumb img").each((key, img) => {
    log("Process image:", img);
    const $img = $(img);

    if (!$img.attr("data-xx-original-src")) {
      // "//img.alicdn.com/bao/uploaded/i1/O1CN01NjCKv91purdU1nTSd_!!0-rate.jpg_40x40.jpg"
      // "//img.alicdn.com/bao/uploaded/i1/O1CN01NjCKv91purdU1nTSd_!!0-rate.jpg"
      originalImage("_40x40.jpg", "")($img);
      replaceImgSrc("_40x40.jpg", "_400x400.jpg")($img);
    }

    imgUrls.push({
      original: $img.attr("data-xx-original-src"),
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
   * 将原来的图片列表隐藏，生成新的图片列表
   */

  $("div.rate-grid > table").hide();

  // Re-create root element for photo list
  $(".xx-photo-list").remove();
  $("div.rate-grid").append(
    $("<div/>", {
      // text: "Photo List",
      class: "xx-photo-list",
      css: { width: "800px" }
    })
  );

  imgUrls.forEach((item, i) => {
    $(".xx-photo-list").append(
      $("<div/>", {
        class: "xx-photo-item",
        css: {
          float: "left",
          position: "relative",
          margin: "5px"
        }
      }).append(
        $("<img/>", {
          src: item.thumb400,
          css: { width: "150px" },
          attr: {
            "data-xx-original-src": item.original
          }
        })
      )
    );
  });

  $(".xx-photo-list img").each((key, img) => {
    wrapDownloadButtonToImage(img, icon, downloadImage2);
  });
})();
