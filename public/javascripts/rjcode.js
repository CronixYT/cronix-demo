function getUrl(value) {
  var tempInput = document.createElement("input");
  tempInput.style = "position: absolute; left: -1000px; top: -1000px";
  tempInput.value = value;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
  const btn = document.getElementById("download-btn");
  btn.innerHTML = "Copied!";
  setTimeout(() => {
    btn.innerHTML = "Copy Download Link";
  }, 2500);
}
