/* global $, downloadImage2 */
/* exported $, addDownloadButtonTo, wrapDownloadButtonToImage, wrapImagesWithDownloadBtn */
/* exported replaceImgSrc */

/**
 * Process the HTML element
 */

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
 * Loop all the images on the webpage and wrap a download button one by one
 * @param {boolean} active When false, to remove all the download button
 */
const wrapImagesWithDownloadBtn = function(active, icon, downloadHandler, images = document.querySelectorAll("img")) {
  for (var i = 0; i < images.length; i++) {
    var image = images[i];
    if (active) {
      wrapDownloadButtonToImage(image, icon, downloadHandler);
    } else {
      image.removeAttribute("button");
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

console.log("utils/utils.js loaded.");
