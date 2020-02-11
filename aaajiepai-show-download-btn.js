/* global $, downloadImage2 */

function handleDownloadImage() {
  var imgURL = $("img#pic").attr("src");
  downloadImage2(imgURL);
}

function handlePreviewImage() {
  var imgURL = $("img#pic").attr("src");
  window.open(imgURL);
}

// http://bbs.3ajiepai.com/forum.php?mod=viewthread&tid=160693&from=album
// http://bbs.3ajiepai.com/thread-160693-1-1.html
function handleGoto() {
  var currentLocation = window.location.href;

  // https://regex101.com/codegen?language=javascript
  function getTId(url) {
    const regex = /thread-(\d+)-/g;
    const str = url; //`http://bbs.3ajiepai.com/thread-160693-1-1.html`;
    let m;
    while ((m = regex.exec(str)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }
      return m[1];
      // The result can be accessed through the `m`-variable.
      //      m.forEach((match, groupIndex) => {
      //        console.log(`Found match, group ${groupIndex}: ${match}`);
      //      });
    }
  }

  var tId = getTId(currentLocation);
  var nextLocation = `http://bbs.3ajiepai.com/forum.php?mod=viewthread&tid=${tId}&from=album`;
  console.log("jump to: ", nextLocation);
  window.location.href = nextLocation;
}

function addDownloadButton() {
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
  $("#photo_pic").append($a);
}

function addPreviewButton() {
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
  $("#photo_pic").append($a);
}

function addGotoButton() {
  var style = {
    class: "a-class-name-placeholder-need-to-change",
    css: {
      position: "fixed",
      left: "0px",
      top: "0px",
      "background-color": "white",
      "font-size": "32px",
      "z-index": 9999
    }
  };
  var $a = $("<a>", style);
  $a.html("只看大图");
  $a.click(handleGoto);
  $("body").append($a);
}

//setTimeout(addDownloadButton, 500);
//setTimeout(addPreviewButton, 500);

$(function() {
  console.log("aaajiepai-show-download-btn.js");
  addDownloadButton();
  addPreviewButton();
  addGotoButton();
});
