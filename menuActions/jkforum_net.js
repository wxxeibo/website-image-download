/* global createLogger, $, replaceImgSrc */

const log = createLogger("menuActions/jkforum_net.js");

log("$:", $);

$(".t_f img").each((key, img) => {
  let $img = $(img);
  // "http://img1qn.moko.cc/2018-03-07/2dbd572f-8a03-4666-8a23-e1b113c4245c.jpg?imageView2/2/w/915/h/915/q/85"
  // "http://img1qn.moko.cc/2018-03-07/2dbd572f-8a03-4666-8a23-e1b113c4245c.jpg"
  replaceImgSrc(".thumb.jpg", "")($img);

  // 图片不要太大了
  // $img.css("width", "100%");
});
