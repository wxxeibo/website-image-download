/* global $ */

function handleDownloadImage() {
  var imgURL = $("img#pic").attr("src");
  var a = $("<a>")
    .attr("href", imgURL)
    .attr("download", "")
    .appendTo("body");
  a[0].click();
  a.remove();
}

function handlePreviewImage() {
  var imgURL = $("img#pic").attr("src");
  window.open(imgURL);
}

const baseStyle = {
  class: "a-class-name-placeholder-need-to-change",
  css: {
    position: "relative",
    "background-color": "white",
    "font-size": "32px",
    height: 0,
    "z-index": 9999
  }
};

const aStyle = {
  class: "a-class-name-placeholder-need-to-change-a",
  css: {
    "background-color": "white"
  }
};

const createDownloadButton = () => {
  const $a = $("<a>", aStyle);
  $a.html("下载图片");
  $a.click(handleDownloadImage);
  return $a;
};

const createPreviewButton = () => {
  const $a = $("<a>", aStyle);
  $a.html("预览图片");
  $a.click(handlePreviewImage);
  return $a;
};

function addButtons() {
  //$a.insertBefore($('.js-stream-item.stream-item.stream-item img'));
  $(".AdaptiveMedia-photoContainer.js-adaptive-photo").map((i, div) => {
    // 已经添加过按钮，就不用重复添加了
    if ($(div).children().length !== 1) {
      return;
    }
    const style = Object.assign({}, baseStyle);
    style.css.left = "0px";
    style.css.top = "0px";
    const $div = $("<div>", style);
    $div.append(createPreviewButton());
    $div.append(createDownloadButton());
    $(div).prepend($div);
    //    console.log(div);
  });
}

$(function() {
  const t = setInterval(addButtons, 2000);
  //  setTimeout(addButtons, 2000);
});
