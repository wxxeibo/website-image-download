/* global $, downloadHandler, createLogger */

(() => {
  const log = createLogger("www.jp393.com/init.js");

  log("start");

  $(".t_f img").each((key, img) => {
    log("Process image:", img);

    const $img = $(img);
    // 原来的 onClick 会导致点击图片时候弹出新窗口
    $img.prop("onclick", null).off("click");

    // Click image to download this image
    $img.click(downloadHandler);
  });

  const eventHandler = event => {
    if (event.code === "KeyL") {
      log("L pressed");

      // t_f
      $(".t_f img").each((key, img) => {
        log("Process image:", img);

        const $img = $(img);
        // 原来的 onClick 会导致点击图片时候弹出新窗口
        // $img.attr("onclick", null).off("click");
        const newSrc = $img.attr("src").replace(".md.jpg", ".jpg");
        $img.attr("src", newSrc);
        $img.css("width", "30%");

        // Click image to download this image
        // $img.click(downloadHandler);
      });

      // downloadImage2($img.attr("src").replace("mw690", "large"));
    }
  };

  // KeyboardEvent.keyCode
  // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
  document.addEventListener("keyup", eventHandler);
})();
