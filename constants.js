(function() {
  const btn1attrs = {
    class: "a-class-name-placeholder-need-to-change",
    css: {
      position: "absolute",
      right: "0px",
      top: "0px",
      "background-color": "white",
      "font-size": "32px",
      "z-index": 9999
    }
  };
  const btn2css = Object.assign({}, btn1attrs.css, { top: "64px" });

  window.c0nfig = {
    downloadButtonAttrs: btn1attrs,
    previewButtonAttrs: {
      class: "a-class-name-placeholder-need-to-change",
      css: btn2css
    }
  };
}());
