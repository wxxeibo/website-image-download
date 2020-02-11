/* global $, createLogger, replaceImgSrc, addDownloadButtonTo */

const log = createLogger("shevx/load-large-pic.js");

log("start");

$(function() {
  log("ready");

  // Process pictures on page: https://www.shevx.com/forum-377-1.html
  $(".attach").each((key, img) => {
    // src="http://218.65.30.232:96/day_110714/110714150541bd82e42eae770c.jpg.thumb.jpg"
    replaceImgSrc(".thumb.jpg")($(img));
  });

  // Process pictures on page: https://www.shevx.com/thread-153091-1-1.html
  $("#postlist .t_msgfont")
    .first()
    .find("img")
    .each((key, pic) => {
      replaceImgSrc(".thumb.jpg")($(pic));
      addDownloadButtonTo(pic, 30);
    });

  // Process pictures on page: https://www.shevx.com/thread-71639-1-1.html
  $(".postattachlist")
    .find("img")
    .each((key, pic) => {
      replaceImgSrc(".thumb.jpg")($(pic));
      addDownloadButtonTo(pic, 30);
    });
});

log("end");
