/* global $, downloadHandler, createLogger */

(() => {
  const log = createLogger("www.jiepaigirl.com/init.js");

  $(".t_fsz img").each((key, img) => {
    log("Process image:", img);

    const $img = $(img);
    // 原来的 onClick 会导致点击图片时候弹出新窗口
    $img.prop("onclick", null).off("click");

    // Click image to download this image
    $img.click(downloadHandler);
  });
})();
