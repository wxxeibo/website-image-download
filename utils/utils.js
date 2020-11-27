/* global dataAttrFlag */
/* global $, downloadImage2 */
/* exported $, addDownloadButtonTo, wrapImagesWithDownloadBtn */
/* exported replaceImgSrc, originalImage, setOriginalImageUrl, dataAttrFlag */
/* exported triggerClick, eventHandlerGenerator */

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

/**
 * Put the original image src in the data attribute, so the downloader could download the original images.
 */
const setOriginalImageUrl = () => {
  $("#description img").each((index, img) => {
    img.setAttribute(dataAttrFlag, $(img).attr("src"));
  });
};

/**
 * Click on an element
 * @param {string} selector A jQuery selector for button
 */
const triggerClick = selector => {
  const $a = $(selector);
  $a.on("click", event => {
    // log("triggerClick()", "selector:", selector, "event:", event);
  });
  $a.click(); // not works
  $a.mousedown(); // not works
  $a.get(0) && $a.get(0).click(); // works
};

const eventHandlerGenerator = mapping => event => {
  console.log("eventHandlerGenerator()", mapping, event, event.code);

  const procedure = mapping[event.code];
  if (!procedure) {
    console.log("eventHandlerGenerator()", "No process for this key.");
    return;
  }

  procedure();
};

console.log("utils/utils.js loaded.");
