/* global $ */

var imgURL = $("img#pic").attr("src");

console.log(imgURL);

var a = $("<a>")
  .attr("href", imgURL)
  .attr("download", "")
  .appendTo("body");

a[0].click();

a.remove();
