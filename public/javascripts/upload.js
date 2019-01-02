document.querySelector("#file-upload").onchange = function() {
  document.querySelector("#file-name").textContent = this.files[0].name;
};
