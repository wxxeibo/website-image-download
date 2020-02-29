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

  $(".tm-m-photos-thumb img").each((key, img) => {
    log("Process image:", img);

    const $img = $(img);

    // "//img.alicdn.com/bao/uploaded/i1/O1CN01NjcKv91purdU1nTSd_!!0-rate.jpg_40x40.jpg"
    // "//img.alicdn.com/bao/uploaded/i1/O1CN01NjcKv91purdU1nTSd_!!0-rate.jpg"
    originalImage("_40x40.jpg", "")($img);
    replaceImgSrc("_40x40.jpg", "_400x400.jpg")($img);

    // 图片不要太大了
    $img.css("width", "150px");
    $img.css("height", "auto");

    // 一行展示更多图片
    $(".tm-col-master").css("width", "800px");

    wrapDownloadButtonToImage(img, icon, downloadImage2);
  });

  $(".tm-rate-reply").remove(); // 删除店主评论文字部分（太占版面了），只看照片。
  $(".tm-rate-fulltxt").remove(); // 删除顾客评论
})();
