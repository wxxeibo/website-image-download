/* global $, downloadImage2 */

function handleDownloadImage() {
  const imgUrl = $(this)
    .parent()
    .find("img")
    .attr("src");
  downloadImage2(imgUrl);
}

function handlePreviewImage() {
  const imgUrl = $(this)
    .parent()
    .find("img")
    .attr("src");
  window.open(imgUrl);
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

/**
 * @param {jQuery} $target Add the download button to the $target
 */
function addDownloadButton($target) {
  const style = Object.assign({}, baseStyle);
  style.css.left = "0px";
  style.css.top = "0px";
  const $a = $("<a>", style);
  $a.html("Download");
  $a.click(handleDownloadImage);
  $target.append($a);
}

function addPreviewButton($target) {
  const style = Object.assign({}, baseStyle);
  style.css.left = "0px";
  style.css.top = "60px";
  var $a = $("<a>", style);
  $a.html("Preview");
  $a.click(handlePreviewImage);
  $target.append($a);
}

//setTimeout(addDownloadButton, 500);
//setTimeout(addPreviewButton, 500);

$(function() {
  $(".alignnone").wrap('<div class="xx-img-parent" style="position: relative"></div>');
  $(".xx-img-parent").each((i, element) => {
    /**
     * @param {HTMLElement} element
     */
    addDownloadButton($(element));
    addPreviewButton($(element));
  });
});
