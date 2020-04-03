document.querySelectorAll(".imgclasstag").forEach(a => {
  const originalSrc = a.firstChild.getAttribute("src").replace(/\.jpg?.*/, ".jpg");
  a.firstChild.setAttribute("src", originalSrc);
});
