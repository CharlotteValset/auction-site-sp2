export function handleImageError(image) {
  image.onerror = function () {
    image.src = placeholderImg;
  };
}
