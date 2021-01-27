/* global openPopup */

(() => {
  const matchResults = document.title.match(/\w+-\d+/);
  if (!matchResults) {
    console.log("not found code in title");
    return;
  }
  const javCode = matchResults[0];
  // openPopup(javCode, 0);

  const doSomething = db => {
    db.data.forEach(item => {
      if (item.code === javCode) {
        const content = `== Saved ==<br>Code: ${javCode}, Categories: ${item.categories}`;
        openPopup(content, 0);
      }
    });
  };

  // https://dev.to/aussieguy/reading-files-in-a-chrome-extension--2c03
  // Need config "web_accessible_resources" field in manifest.json
  const url = chrome.runtime.getURL("data/jav-db.json");
  fetch(url)
    .then(response => response.json()) //assuming file contains json
    .then(json => doSomething(json));
})();

// https://stackoverflow.com/a/41578299
// Defined the return result for chrome.tabs.executeScript
const result = "jav.sh/init.js loaded";
result;
