/* global openPopup */

(() => {
  const matchResults = document.title.match(/\w+-\d+/);
  let javCode = "";
  try {
    javCode = matchResults[0];
    // openPopup(javCode, 0);
  } catch (error) {
    console.log("failed to parse title, error:", error);
    alert("title: " + document.title);
  }

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
