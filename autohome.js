/* global $, replaceImgSrc */

$(".x-loaded").each((key, val) => {
  let $div = $(val);
  let img = $div.find("img")[0];

  // Show the original picture instead of the thumb one
  replaceImgSrc("/500_", "/")($(img));
});
