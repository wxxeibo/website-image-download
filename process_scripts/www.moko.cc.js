/* global $, replaceImgSrc, downloadHandler, createLogger */

/**
 * File: www.moko.cc.js
 * Description: 处理网页中的图片等，会被执行多次
 */

(() => {
  const log = createLogger("process_scripts/www.moko.cc.js");

  $(".picBox img").each((key, img) => {
    log("Process image:", img);

    const $img = $(img);

    // 在页面初始化之后，有些图片只有 src2 属性，没有 src 属性。
    // <img src2="http://img1qn.moko.cc/2018-09-17/9bf326de-bc02-4b42-ad95-1f03eeadd03f.jpg?imageView2/2/w/915/h/915/q/85"
    //   title="Rayshen 美空 http://www.moko.cc/rayshen" alt="Rayshen作品《朱可儿》"
    // >
    // 估计是做懒加载，只有浏览到的图片才会被创建出来 src 属性。
    if (!$img.attr("src")) {
      log("Image src not found, continue.");
      return;
    }

    // "http://img1qn.moko.cc/2018-03-07/2dbd572f-8a03-4666-8a23-e1b113c4245c.jpg?imageView2/2/w/915/h/915/q/85"
    // "http://img1qn.moko.cc/2018-03-07/2dbd572f-8a03-4666-8a23-e1b113c4245c.jpg"
    replaceImgSrc("?imageView2/2/w/915/h/915/q/85", "")($img);

    // 图片不要太大了
    $img.css("width", "100%");

    // Click image to download this image
    $img.click(downloadHandler);
  });
})();
