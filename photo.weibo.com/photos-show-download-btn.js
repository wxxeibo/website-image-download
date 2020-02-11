/* global $, downloadImage2 */

console.log("weibo/photos-show-download-btn.js");

function handleDownloadImage() {
  var imgURL = $("img#pic").attr("src");
  // downloadImage(imgURL);
  downloadImage2(imgURL);
}

function handlePreviewImage() {
  var imgURL = $("img#pic").attr("src");
  window.open(imgURL);
}

const baseStyle = {
  class: "a-class-name-placeholder-need-to-change",
  css: {
    position: "absolute",
    "background-color": "white",
    "font-size": "32px",
    "z-index": 9999
  }
};

function _addDownloadButton($target) {
  const style = Object.assign({}, baseStyle);
  style.css.left = "30px";
  style.css.top = "100px";
  const $a = $("<a>", style);
  $a.html("下载图片");
  $a.click(handleDownloadImage);
  $target.append($a);
}

function _addPreviewButton($target) {
  const style = Object.assign({}, baseStyle);
  style.css.left = "30px";
  style.css.top = "164px";
  var $a = $("<a>", style);
  $a.html("预览图片");
  $a.click(handlePreviewImage);
  $target.append($a);
}

//setTimeout(addDownloadButton, 500);
//setTimeout(addPreviewButton, 500);

$(function() {
  const $target = $(".artwork");
  _addDownloadButton($target);
  _addPreviewButton($target);
  handleDownloadImage();
});
