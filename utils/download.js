/* global $ */
/* exported $, downloadImage, downloadImage2, downloadHandler */

/**
 * Process the download action
 */

/**
 * Work before Chrome 65
 * https://www.chromestatus.com/feature/4969697975992320
 * https://crbug.com/714373
 * https://chromereleases.googleblog.com/2018/03/stable-channel-update-for-desktop_13.html
 * > To avoid what is essentially user-mediated cross-origin information leakage,
 * Blink will start to ignore the presence of the download attribute on anchor elements with cross origin attributes.
 */
function downloadImage(url) {
  var a = $("<a>")
    .attr("href", url)
    .attr("download", url)
    .appendTo("body");
  a[0].click();
  a.remove();
}

/**
 * @param {string} url The full URL to this image
 * If the URL is prefix with "//", e.g. "//foo.com/bar.jpg", will append the protocol
 */
function downloadImage2(url) {
  console.log("downloadImage2(), url:", url);

  if (!url) {
    console.error("[utils.js:downloadImage2()] missing url!");
    return;
  }

  // If prefix with "//", auto append the protocol, e.g. "https://"
  if (url.startsWith("//")) {
    url = `${location.protocol}${url}`;
  }

  // eventPage.js
  chrome.runtime.sendMessage({ greeting: "hello", url }, function(response) {
    console.log("chrome.runtime.sendMessage", response);
  });
}

/**
 * Pass this function to jQuery's `click()` function.
 */
var downloadHandler;
if (typeof downloadHandler !== "function") {
  downloadHandler = event => {
    const $img = $(event.target);
    const imgUrl = $img.attr("src");
    console.log("downloadHandler(), imgUrl:", imgUrl);
    downloadImage2(imgUrl);
  };
}

console.log("utils/utils.js loaded.");
