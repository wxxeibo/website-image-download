/* global $, replaceImgSrc, downloadImage2 */

$(".pic img").each((key, img) => {
  let $img = $(img);
  // "//img.pconline.com.cn/images/upload/upc/tx/photoblog/1701/08/c3/35042515_1483854380185_mthumb.jpg"
  // "//img.pconline.com.cn/images/upload/upc/tx/photoblog/1701/08/c3/35042515_1483854380185.jpg"
  replaceImgSrc("_mthumb.jpg", ".jpg")($img);

  const imgUrl = `http:${$img.attr("src")}`;

  // Click image to download this image
  $img.click(() => {
    // downloadImage($img.attr("src"));
    console.log("Click to download:", imgUrl);
    downloadImage2(imgUrl);
  });
});
