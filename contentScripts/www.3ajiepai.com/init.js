/* global $, downloadHandler, createLogger, downloadImage2 */

(() => {
  const log = createLogger("www.3ajiepai.com/init.js");

  log("start");

  $("br").remove();

  // A way to modify window object
  // start
  function script() {
    // 原来的 img onClick 会导致点击图片时候弹出新窗口
    window.zoom = () => {
      console.log("original zoom() function is already override");
    };
  }
  function inject(fn) {
    const s = document.createElement("script");
    s.text = `(${fn.toString()})();`;
    document.documentElement.appendChild(s);
  }
  inject(script);
  // end

  $(".zoom").each((key, img) => {
    log("Process image:", img);

    const $img = $(img);
    $img.css("width", "400px");

    // Click image to download this image
    $img.click(downloadHandler);
  });

  const eventHandler = event => {
    if (event.code === "KeyD") {
      log("D pressed");

      const $img = $(".photo_pic > #photo_pic > #pic");
      if ($img.length > 0) {
        // 在大图模式下找到大图，并下载
        const imgFullUrl = $img.attr("src");
        downloadImage2(imgFullUrl);
      }
    }
  };

  // KeyboardEvent.keyCode
  // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
  document.addEventListener("keyup", eventHandler);
})();
