/* global createLogger, $, replaceImgSrc, downloadImage2 */

const log = createLogger("menuActions/moko_cc.js");

log("$:", $);

const downloadHandler = event => {
  const $img = $(event.target);
  const imgUrl = $img.attr("src");
  console.log("downloadHandler(), imgUrl:", imgUrl);
  downloadImage2(imgUrl);
};

$(".picBox img").each((key, img) => {
  let $img = $(img);
  // "http://img1qn.moko.cc/2018-03-07/2dbd572f-8a03-4666-8a23-e1b113c4245c.jpg?imageView2/2/w/915/h/915/q/85"
  // "http://img1qn.moko.cc/2018-03-07/2dbd572f-8a03-4666-8a23-e1b113c4245c.jpg"
  replaceImgSrc("?imageView2/2/w/915/h/915/q/85", "")($img);

  // 图片不要太大了
  $img.css("width", "100%");

  // Click image to download this image
  $img.click(downloadHandler);
});
