/* global $, downloadHandler, createLogger */

(() => {
  const log = createLogger("www.jiepaids.com/init.js");

  $(".t_f img").each((key, img) => {
    log("Process image:", img);

    const $img = $(img);
    // 原来的 onClick 会导致点击图片时候弹出新窗口
    $img.prop("onclick", null).off("click");

    // Click image to download this image
    $img.click(downloadHandler);
  });

  log("waiting 2s to run code");
  setTimeout(() => {
    // <img ... onclick="zoom(this, this.src, 0, 0, 0)" ... />
    // 需要覆盖 window.zoom
    // 但是不知道为什么覆盖不了
    window.zoom = () => {};
  }, 2000);
})();
