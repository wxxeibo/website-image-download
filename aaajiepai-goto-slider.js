/* global $ */

// http://bbs.3ajiepai.com/forum.php?mod=viewthread&tid=160693&from=album
// http://bbs.3ajiepai.com/thread-160693-1-1.html
$(function() {
  var currentLocation = window.location.href;

  // https://regex101.com/codegen?language=javascript
  function getTId(url) {
    const regex = /thread-(\d+)-/g;
    const str = url; //`http://bbs.3ajiepai.com/thread-160693-1-1.html`;
    let m;
    while ((m = regex.exec(str)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }
      return m[1];
      // The result can be accessed through the `m`-variable.
      m.forEach((match, groupIndex) => {
        console.log(`Found match, group ${groupIndex}: ${match}`);
      });
    }
  }

  var tId = getTId(currentLocation);
  var nextLocation = `http://bbs.3ajiepai.com/forum.php?mod=viewthread&tid=${tId}&from=album`;
  console.log("jump to: ", nextLocation);
  window.location.href = nextLocation;
});
