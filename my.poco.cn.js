/* global $ */

var INTERVAL_ID,
  DOWNLOADED_IMAGES_COUNTER = 0,
  IMAGES_COUNT = $(".photo").length;

console.log("Images count:", IMAGES_COUNT);

function stopCheck() {
  clearInterval(INTERVAL_ID);
}

$(".photo").each((key, val) => {
  const $img = $(val).find("img");
  // http://image18-c.poco.cn/mypoco/myphoto/20170201/14/5568760620170201141042037.jpg?2048x1365_120
  // http://image18-c.poco.cn/mypoco/myphoto/20170201/14/5568760620170201141042037_640.jpg?2048x1365_120
  let newSrc = $img.attr("src").replace("_640.jpg", ".jpg");
  $img.attr("src", newSrc);
  $img.on("load", function() {
    DOWNLOADED_IMAGES_COUNTER++;
    console.log("Finished:", DOWNLOADED_IMAGES_COUNTER);
  });
});

// Check all finished per second.
INTERVAL_ID = setInterval(function() {
  console.log("is all finished? current finished:", DOWNLOADED_IMAGES_COUNTER);
  if (IMAGES_COUNT === DOWNLOADED_IMAGES_COUNTER) {
    stopCheck();
    alert("All done");
  }
}, 1000);
