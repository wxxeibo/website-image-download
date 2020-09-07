/* global $, downloadImage2, createLogger */

(() => {
  const log = createLogger("moemzi.com/init.js");

  const eventHandler = event => {
    if (event.code === "KeyD") {
      log("D pressed");

      const $img = $(".imageclick-href").find("img");
      const imgFullUrl = $img.attr("src");
      downloadImage2(imgFullUrl);
    }
  };

  // KeyboardEvent.keyCode
  // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
  document.addEventListener("keyup", eventHandler);
})();
