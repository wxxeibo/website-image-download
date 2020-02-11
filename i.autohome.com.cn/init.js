/* global $, createLogger, downloadImage2 */

(() => {
  const log = createLogger("i.autohome.com.cn/init.js");

  log("start");

  const eventHandler = event => {
    if (event.code === "KeyD") {
      log("D pressed");

      const $img = $("#imgPhoto");
      if ($img.length > 0) {
        // 在大图模式下找到大图，并下载
        const imgFullUrl = $img.attr("src").replace("_500", "");
        downloadImage2(imgFullUrl);
      }
    }
  };

  // KeyboardEvent.keyCode
  // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
  document.addEventListener("keyup", eventHandler);
  document.addEventListener("keyup", () => {
    console.log("keyup");
  });
  setTimeout(() => {
    document.addEventListener("keyup", () => {
      console.log("keyup");
    });
  }, 2000);

  log("end");
})();
