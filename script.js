const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

btn.addEventListener("click", downloadAndDisplayImages);

function downloadAndDisplayImages() {
  Promise.all(images.map(downloadImage))
    .then((results) => {
      output.innerHTML = ""; // Clear previous content
      results.forEach((imageElement) => {
        output.appendChild(imageElement);
      });
    })
    .catch((err) => console.error(err));
}

function downloadImage(image) {
  return new Promise((resolve, reject) => {
    const imgElement = new Image();
    imgElement.src = image.url;

    imgElement.onload = () => {
      resolve(imgElement);
    };

    imgElement.onerror = () => {
      reject(new Error(`Failed to load image's URL: ${image.url}`));
    };
  });
}
