import placeholderImg from "../../../images/no_img.jpg";

/**
 * Handles image loading errors by replacing the image source with a placeholder image.
 *
 * @param {HTMLImageElement} image - The HTML image element to handle errors for.
 * @example
 * // Usage example:
 * const imgElement = document.getElementById("productImage");
 * handleImageError(imgElement);
 */
export function handleImageError(image) {
  // Set up an error event handler for the image
  image.onerror = function () {
    // Replace the image source with a placeholder image in case of an error
    image.src = placeholderImg;
  };
}
