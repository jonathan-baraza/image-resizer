const form = document.querySelector("#img-form");
const img = document.querySelector("#img");
const outputPath = document.querySelector("#output-path");
const filename = document.querySelector("#filename");
const heightInput = document.querySelector("#height");
const widthInput = document.querySelector("#width");

function loadImage(e) {
  const file = e.target.files[0];
  if (!isFileImage(file)) {
    console.log("Please select an image");
    return;
  }
  console.log("success");
  console.log(file);

  form.style.display = "block";
  filename.innerHTML = file.name;
}

//Make sure file is image
function isFileImage(file) {
  const acceptedImageTypes = [
    "image/gif",
    "image/png",
    "Image/jpeg",
    "image/jpg",
  ];

  return file && acceptedImageTypes.includes(file.type);
}

img.addEventListener("change", loadImage);
