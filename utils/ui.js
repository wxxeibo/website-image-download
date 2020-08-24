/* exported openPopup */

/**
 * @file ui.js
 * @description Some utils to help create UI components
 */

function openPopup(content = "", duration = 1000) {
  console.log("[DEBUG]", "openPopup()", content, duration);

  var newDiv = document.createElement("div");
  newDiv.innerHTML += `<div id="xx-popup" class="xx-popup">
<div style="height: 100px;">${content}</div>
</div>`;

  // add the newly created element and its content into the DOM
  var currentDiv = document.getElementById("main_container");
  document.body.insertBefore(newDiv, currentDiv);

  // Close popup after 1s
  setTimeout(() => {
    var el = document.getElementById("xx-popup");
    el.style.display = "none";
  }, duration);
}

console.log("utils/ui.js loaded.");
