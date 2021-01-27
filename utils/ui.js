/* global $, dataAttrFlag, imgFlagAttrName, originalImage, replaceImgSrc */
/* exported openPopup, wrapDownloadButtonToImage, wrapImagesWithDownloadBtn */
/* exported createPhotoList, checkJavCodeAndShowPopup */

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
const wrapDownloadButtonToImage = (img, downloadHandler, config = null) => {
  if ($(img).attr(imgFlagAttrName) === "true") {
    // The download button exists
    return;
  }

  $(img).attr(imgFlagAttrName, "true");
  $(img).wrap(`<p class="xx-download" style="display:flex;"></p>`);

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
    this.style.opacity = "1.0"; // eslint-disable-line no-invalid-this
  }

  function handlerOut() {
    this.style.opacity = "0.3"; // eslint-disable-line no-invalid-this
  }

  const $button = $(`<span type="xx-download-button" class="xx-download-button" title="Download Image"></span>`)
    .css("background", "#FFF " + "url(" + getIcon("download.png") + ")" + " no-repeat center center")
    .css("background-size", "32px")
    .css("background-color", "rgb(255, 255, 255)")
    .hover(handlerIn, handlerOut);
  $button.click(downloadImg);

  const $previewBtn = $(`<span type="xx-download-button" class="xx-download-button" title="Download Image"></span>`)
    .css("background", "#FFF " + "url(" + getIcon("open.png") + ")" + " no-repeat center center")
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
  // .append(
  //   $(`<img src="${$(img).attr(dataAttrFlag)}" />`)
  //     .css("width", "1px")
  // )

  // Load original file to get image real size
  const _img = new Image();
  _img.onload = function() {
    let borderColor = "#0f0"; // default color is green, means normal size
    if (this.width < 500) {
      // Change border color to red, mean img too small
      borderColor = "#c00";
    }
    $(img)
      .parent()
      .css("border-color", borderColor)
      .append(`<span class="xx-img-size-title">${this.width}x${this.height}</span>`);
  };
  _img.src = $(img).attr(dataAttrFlag);

  if (config) {
    // Add the original image URL to the data attribute
    originalImage(config.original, config.full)($(img));
    // Show the original picture instead of the thumb one
    replaceImgSrc(config.original, config.thumb)($(img));
  }
};

/**
 * @param {string} filename e.g. "download.png"
 * @returns {string} "chrome-extension://ooj...llj/contentScripts/img/download.png"
 */
const getIcon = filename => chrome.runtime.getURL(`contentScripts/img/${filename}`);

/**
 * Loop all the images on the webpage and wrap a download button one by one
 * @param {boolean} active When false, to remove all the download button
 */
const wrapImagesWithDownloadBtn = function(active, downloadHandler, images = document.querySelectorAll("img")) {
  for (var i = 0; i < images.length; i++) {
    var image = images[i];
    if (active) {
      wrapDownloadButtonToImage(image, downloadHandler);
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

const createPhotoList = (reviewSectionSelector, imgUrls, downloadImage2) => {
  // Re-create root element for photo list
  $(".xx-photo-list").remove();
  $(reviewSectionSelector).append(
    $("<div/>", {
      // text: "Photo List",
      class: "xx-photo-list",
      // 7x160px=1120px, 7 img in 1 row
      css: { width: "1400px", border: "1px solid" }
    })
  );

  imgUrls.forEach((item, i) => {
    $(".xx-photo-list").append(
      $("<div/>", {
        class: "xx-photo-item",
        css: {
          float: "left",
          position: "relative",
          margin: "5px",
          height: "270px"
        }
      }).append(
        $("<img/>", {
          class: "xx-photo-item-thumb",
          src: item.thumb400,
          css: { width: "150px", cursor: "pointer" },
          attr: {
            [dataAttrFlag]: item.original
          }
        })
      )
    );
  });

  $(".xx-photo-list img").each((key, img) => {
    wrapDownloadButtonToImage(img, downloadImage2);
  });
};

const checkJavCodeAndShowPopup = () => {
  const matchResults = document.title.match(/\w+-\d+/);
  if (!matchResults) {
    console.log("not found code in title");
    return;
  }
  const javCode = matchResults[0];
  // openPopup(javCode, 0);

  let content = `== Found Code ==<br/>JAV Code: ${javCode}<br/>`;
  window.db.data.forEach(item => {
    if (item.code === javCode) {
      content += `== Found in DB ==<br/>Code: ${javCode}, Categories: ${item.categories}<br/>`;
      openPopup(content, 0);
    }
  });
};

console.log("utils/ui.js loaded.");
