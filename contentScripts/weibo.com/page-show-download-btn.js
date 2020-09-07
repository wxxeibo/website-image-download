/* global $, createLogger, addDownloadButtonTo */

/**
 * Run this script when access https://weibo.com/weibo
 */

$(function() {
  const disabled = true;
  const log = createLogger("weibo/pages-show-download-btn.js");

  log("start");

  if (disabled) {
    log("disabled");
    return;
  }

  const addDownloadButtonsToPhotos = photos => {
    photos.forEach(photo => {
      addDownloadButtonTo(photo);
    });
  };

  const findPhotosAndAddDownloadButtons = () => {
    log("findPhotosAndAddDownloadButtons()");
    const pics = document.querySelectorAll(".WB_pic");
    if (pics.length !== 0) {
      addDownloadButtonsToPhotos(pics);
    } else {
      log("waiting 2s to run code");
      setTimeout(() => {
        addDownloadButtonsToPhotos(document.querySelectorAll(".WB_pic"));
      }, 2000);
    }
  };

  findPhotosAndAddDownloadButtons();

  log("end");
});
