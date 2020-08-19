/* global $, createLogger, replaceImgSrc */

(() => {
  const log = createLogger("club.autohome.com.cn/init.js");

  log("start");

  const processLPressed = () => {
    $(".x-loaded").each((key, val) => {
      let $div = $(val);
      let img = $div.find("img")[0];

      // Show the original picture instead of the thumb one
      replaceImgSrc("/500_", "/")($(img));
    });
  };

  const eventHandler = event => {
    if (event.code === "KeyL") {
      log("L pressed");

      processLPressed();
    }
  };

  // KeyboardEvent.keyCode
  // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
  document.addEventListener("keyup", eventHandler);

  log("end");
})();
