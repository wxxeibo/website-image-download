/* global $, downloadImage2 */

$(function() {
  const $donwloadButton = $("<a>", window.c0nfig.downloadButtonAttrs);
  const $previewButton = $("<a>", window.c0nfig.previewButtonAttrs);
  $donwloadButton.html("下载图片");
  $previewButton.html("预览图片");

  window.c0nfig = {
    $donwloadButton: $donwloadButton,
    $previewButton: $previewButton
  };

  function createButtonClickEventHandler(get$Image) {
    return function() {
      var imgURL = get$Image().attr("src");
      downloadImage2(imgURL);
    };
  }

  window.uti1s = {
    // @param {function} get$Image this function should return a jQuery object
    getDownloadButton: function(get$Image) {
      $donwloadButton.click(createButtonClickEventHandler(get$Image));
      return $donwloadButton;
    },
    getPreviewButton: function(get$Image) {
      $previewButton.click(function() {
        var imgURL = get$Image().attr("src");
        window.open(imgURL);
      });
      return $previewButton;
    }
  };
});
