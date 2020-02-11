/* global $, replaceImgSrc */

$(".BDE_Image").each((key, img) => {
  replaceImgSrc(/w%3D580\/sign=[a-z0-9]+/, "pic/item")($(img));
});
