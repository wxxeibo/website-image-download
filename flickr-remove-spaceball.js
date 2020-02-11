/* global $ */

const imgSelector = 'div[id="allsizes-photo"] img';

function addDownloadButton() {
  const $a = window.uti1s.getDownloadButton(function() {
    return $(imgSelector);
  });
  $("#allsizes-photo").append($a);
}

function addPreviewButton() {
  const $a = window.uti1s.getPreviewButton(function() {
    return $(imgSelector);
  });
  $("#allsizes-photo").append($a);
}

//setTimeout(addDownloadButton, 500);
//setTimeout(addPreviewButton, 500);

$(function() {
  // remove spaceball on original image.
  $(".spaceball").remove();

  addDownloadButton();
  addPreviewButton();
});
