import placeholderImg from "../../../images/no_img.jpg";

export function handleImageError(image) {
  image.onerror = function () {
    image.src = placeholderImg;
  };
}
