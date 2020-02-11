/* global $, downloadImage2 */

/**
 * 获得当前需要进行下载／预览的图片的URL
 */
function getImageSrc() {
  return $('div[class="scene-item"] img').attr("src");
}

/**
 * 往哪个div中插入下载／预览按钮
 */
function getButtonContainer() {
  return $(".theater-scene");
}

function handleDownloadImage() {
  var imgURL = getImageSrc();
  // downloadImage(imgURL);
  downloadImage2("https:" + imgURL);
}

function handlePreviewImage() {
  var imgURL = getImageSrc();
  window.open(imgURL);
}

/**
 * @param {Object} btnContainer 往哪个div插入按钮
 */
function _addDownloadButton(btnContainer) {
  var style = {
    class: "a-class-name-placeholder-need-to-change",
    css: {
      position: "absolute",
      right: "0px",
      top: "0px",
      "background-color": "white",
      "font-size": "32px",
      "z-index": 9999
    }
  };
  var $a = $("<a>", style);
  $a.html("下载图片");
  $a.click(handleDownloadImage);
  btnContainer.append($a);
}

/**
 * @param {Object} btnContainer 往哪个div插入按钮
 */
function addPreviewButton(btnContainer) {
  var style = {
    class: "a-class-name-placeholder-need-to-change",
    css: {
      position: "absolute",
      right: "0px",
      top: "64px",
      "background-color": "white",
      "font-size": "32px",
      "z-index": 9999
    }
  };
  var $a = $("<a>", style);
  $a.html("预览图片");
  $a.click(handlePreviewImage);
  btnContainer.append($a);
}

//setTimeout(addDownloadButton, 500);
//setTimeout(addPreviewButton, 500);

$(function() {
  const btnContainer = getButtonContainer();
  _addDownloadButton(btnContainer);
  addPreviewButton(btnContainer);
});
