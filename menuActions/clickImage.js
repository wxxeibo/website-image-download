/* global $ */

$("img").each((key, img) => {
  let $img = $(img);
  const imgUrl = `${$img.attr("src")}`;

  // Click image to download this image
  $img.click(() => {
    // downloadImage($img.attr("src"));
    console.log("Click to download:", imgUrl);
    downloadImage2(imgUrl);
  });
});
