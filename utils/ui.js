/* global $, dataAttrFlag, imgFlagAttrName, originalImage, replaceImgSrc */
/* exported openPopup, wrapDownloadButtonToImage, wrapImagesWithDownloadBtn */

/**
 * @file ui.js
 * @description Some utils to help create UI components
 */

/**
 * @param {string} content Can pass HTML code
 * @param {number} [duration=0] when to auto-hide dialog, in milliseconds, 0 to disable auto-hide
 * @returns {undefined}
 */
function openPopup(content = "", duration = 1000) {
  var newDiv = document.createElement("div");
  newDiv.innerHTML += `<div id="xx-popup" class="xx-popup">
<div style="height: 100px;">${content}</div>
</div>`;

  // add the newly created element and its content into the DOM
  var currentDiv = document.getElementById("main_container");
  document.body.insertBefore(newDiv, currentDiv);

  // Disable auto hide
  if (duration === 0) {
    return;
  }

  // Close popup after 1s
  setTimeout(() => {
    var el = document.getElementById("xx-popup");
    el.style.display = "none";
  }, duration);
}

/**
 * Wrap the given img tag in a div tag
 * This div wraps a download button to download the img
 * A better solution to addDownloadButtonTo()
 * @param {HTMLElement} img
 * @param {string} icon "chrome-extension://ooj...llj/contentScripts/detail.tmall.com/download.png"
 * @param {Function} downloadHandler
 * @param {Object} config Config
 * small thumb => "//img.alicdn.com/bao/uploaded/i1/OCN01NjCKv91purdU1nTSd_!!0-rate.jpg_40x40.jpg"
 * big thumb => "//img.alicdn.com/bao/uploaded/i1/OCN01NjCKv91purdU1nTSd_!!0-rate.jpg_400x400.jpg"
 * full size => "//img.alicdn.com/bao/uploaded/i1/OCN01NjCKv91purdU1nTSd_!!0-rate.jpg"
 * e.g.
 * ```
 * {
 *  "original": "_40x40.jpg",
 *  "thumb": "_400x400.jpg",
 *  "full": ""
 * }
 * ```
 * some have no big thumb, e.g.
 * ```
 * {
 *  "original": /\?imageView.* /
 *  "thumb": "",
 *  "full": ""
 * }
 * ```
 * @external jQuery
 */
const wrapDownloadButtonToImage = (img, icon, downloadHandler, config = null) => {
  // console.log("wrapDownloadButtonToImage()", img, icon);

  if ($(img).attr(imgFlagAttrName) === "true") {
    // The download button exists
    return;
  }

  $(img).attr(imgFlagAttrName, "true");
  $(img).wrap(`<p style="display:flex;"></p>`);

  const downloadImg = event => {
    event.preventDefault();
    event.stopPropagation();
    downloadHandler($(img).attr(dataAttrFlag));
  };
  const previewImg = event => {
    event.preventDefault();
    event.stopPropagation();
    const url = $(img).attr(dataAttrFlag);
    if (!url) {
      throw new Error("no original img src in data attr");
    }
    window.open(url);
  };

  function handlerIn() {
    this.style.opacity = "1.0";
  }

  function handlerOut() {
    this.style.opacity = "0.3";
  }

  const $button = $(`<span type="xx-download-button" class="xx-download-button" title="Download Image"></span>`)
    .css("background", "#FFF " + "url(" + icon + ")" + " no-repeat center center")
    .css("background-size", "32px")
    .css("background-color", "rgb(255, 255, 255)")
    .hover(handlerIn, handlerOut);
  $button.click(downloadImg);

  const $previewBtn = $(`<span type="xx-download-button" class="xx-download-button" title="Download Image"></span>`)
    .css(
      "background",
      "#FFF " +
        "url(" +
        chrome.runtime.getURL("contentScripts/detail.tmall.com/open.png") +
        ")" +
        " no-repeat center center"
    )
    .css("background-size", "32px")
    .css("background-color", "rgb(255, 255, 255)")
    .css("left", "70px")
    .hover(handlerIn, handlerOut);
  $previewBtn.click(previewImg);

  $(img).click(previewImg);
  $(img)
    .parent()
    .append($previewBtn)
    .append($button);

  if (config) {
    // Add the original image URL to the data attribute
    originalImage(config.original, config.full)($(img));
    // Show the original picture instead of the thumb one
    replaceImgSrc(config.original, config.thumb)($(img));
  }
};

/**
 * Loop all the images on the webpage and wrap a download button one by one
 * @param {boolean} active When false, to remove all the download button
 */
const wrapImagesWithDownloadBtn = function(active, icon, downloadHandler, images = document.querySelectorAll("img")) {
  for (var i = 0; i < images.length; i++) {
    var image = images[i];
    if (active) {
      wrapDownloadButtonToImage(image, icon, downloadHandler);
    } else {
      image.removeAttribute(imgFlagAttrName);
      var parentA = image.parentNode;
      var parentB = image.closest("article");
      var selector = "span[class='xx-download-button']";
      var targetA = parentA ? parentA.querySelector(selector) : null;
      var targetB = parentB ? parentB.querySelector(selector) : null;
      var element = targetA || targetB;
      if (element) {
        element.remove();
      }
    }
  }
};

console.log("utils/ui.js loaded.");
