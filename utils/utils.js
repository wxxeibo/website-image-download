/* global dataAttrFlag */
/* global $, downloadImage2 */
/* exported $, addDownloadButtonTo, wrapDownloadButtonToImage, wrapImagesWithDownloadBtn */
/* exported replaceImgSrc, originalImage, setOriginalImageUrl, dataAttrFlag */

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
  // console.log("[DEBUG]", "replaceImgSrc() oldSrc:", oldSrc);
  var newSrc = oldSrc.replace(part, replaced);
  // console.log("[DEBUG]", "replaceImgSrc() newSrc:", newSrc);
  $img.attr("src", newSrc);
};

/**
 * Given <img src="http://abc.com/2019.jpg.thumb.jpg" />
 * The original img src should be the one without ".thumb.jpg" part in string.
 * Add the original image src to the "data-xx-original-src" property.
 * @param {string} part The text need to be removed
 * @return {($img: jQuery) => undefined}
 */
const originalImage = (part, replaced = "") => $img => {
  const thumbSrc = $img.attr("src");
  var originalSrc = thumbSrc.replace(part, replaced);
  console.log(`originalImage(): ${thumbSrc} => ${originalSrc}`);
  $img.attr(dataAttrFlag, originalSrc);
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

const imgFlagAttrName = "data-xx-download-button";

/**
 * Wrap the given img tag in a div tag
 * This div wraps a download button to download the img
 * A better solution to addDownloadButtonTo()
 * @param {HTMLElement} img
 * @param {string} icon "chrome-extension://oojgkpcpifcalolijncnlgkcjdoobllj/detail.tmall.com/download.png"
 * @param {Function} downloadHandler
 */
const wrapDownloadButtonToImage = (img, icon, downloadHandler) => {
  console.log("wrapDownloadButtonToImage()", img, icon);

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
      "#FFF " + "url(" + chrome.runtime.getURL("detail.tmall.com/open.png") + ")" + " no-repeat center center"
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

/**
 * Put the original image src in the data attribute, so the downloader could download the original images.
 */
const setOriginalImageUrl = () => {
  $("#description img").each((index, img) => {
    img.setAttribute(dataAttrFlag, $(img).attr("src"));
  });
};

console.log("utils/utils.js loaded.");
