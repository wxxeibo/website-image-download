/* global $ */

$(function() {
  const center = $("center").first();
  const pathPrefix = center
    .children()
    .first()
    .attr("src")
    .replace("1.jpg", "");
  const arr = Array.from({ length: 110 }, (x, i) => i);
  arr.forEach(i => {
    center.append(`<img src="${pathPrefix}/${i}.jpg" class="content_img" />`);
  });
  $(".weixin").hide();
});
