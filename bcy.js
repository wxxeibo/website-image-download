/* global $, replaceImgSrc */

$(".detail_std.detail_clickable").each((key, img) => {
  replaceImgSrc("/w650")($(img));
});
