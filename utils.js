/* global $ */
/* exported $, downloadImage, downloadImage2, addDownloadButtonTo, wrapDownloadButtonToImage */
/* exported replaceImgSrc */

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
 * Given image with src="http://abc.com/2019.jpg.thumb.jpg"
 * For example, remove ".thumb.jpg" part in string
 * So could see the original pictures
 * @param {string} part The text need to be removed
 * @return {($img: jQuery) => undefined}
 */
const replaceImgSrc = (part, replaced = "") => $img => {
  const oldSrc = $img.attr("src");
  console.log("replaceImgSrc() oldSrc:", oldSrc);
  var newSrc = oldSrc.replace(part, replaced);
  console.log("replaceImgSrc() newSrc:", newSrc);
  $img.attr("src", newSrc);
};

/**
 * Wrap the given img tag in a div tag
 * This div wraps a download button to download the img
 * @param {HTMLElement} img
 */
const addDownloadButtonTo = (img, fontSize = 12) => {
  $(img).wrap(`<div style="position: relative;display:inline-block;"></div>`);
  const $button = $(
    `<button class="xx-download-btn" style="position: absolute;left: 0; font-size: ${fontSize}px">download</button>`
  );
  const downloadImg = () => {
    const picUrl = $(img).attr("src");
    downloadImage2(picUrl);
  };
  $(img).click(downloadImg);
  $button.click(downloadImg);
  $(img)
    .parent()
    .append($button);
};

/**
 * Wrap the given img tag in a div tag
 * This div wraps a download button to download the img
 * A better solution to addDownloadButtonTo()
 * @param {HTMLElement} img
 * @param {string} icon "chrome-extension://oojgkpcpifcalolijncnlgkcjdoobllj/detail.tmall.com/download.png"
 * @param {Function} downloadHandler
 */
const wrapDownloadButtonToImage = (img, icon, downloadHandler) => {
  if ($(img).data("button")) {
    // The download button exists
    return;
  }

  $(img).data("button", "xx-download-button");
  $(img).wrap(`<p style="display:flex;"></p>`);

  const downloadImg = event => {
    event.preventDefault();
    event.stopPropagation();
    downloadHandler($(img).attr("src"));
  };

  function handlerIn() {
    this.style.opacity = "1.0";
  }

  function handlerOut() {
    this.style.opacity = "0.3";
  }

  const $button = $(`<span type="xx-download-button" class="xx-download-button" title="Download Image"></span>`);
  $button.css("background", "#FFF " + "url(" + icon + ")" + " no-repeat center center");
  $button.css("background-size", "32px");
  $button.css("background-color", "rgb(255, 255, 255)");
  $button.hover(handlerIn, handlerOut);

  // $(img).click(downloadImg);
  $button.click(downloadImg);
  $(img)
    .parent()
    .append($button);
};

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

console.log("utils.js loaded.");
