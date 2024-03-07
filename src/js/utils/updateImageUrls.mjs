// Function from Jan Henning Teige to improve performance in Lighthouse
/**
 * Update the image URL with new width and height
 * @param {string} OriginalURL - Original URL of the image
 * @param {number} newWidth - New width of the image
 * @param {number} newHeight - New height of the image
 * @returns {string} - Updated URL with new width and height
 */
export function updateImageUrlFromDomains(url, newWidth, newHeight) {
  const allowedDomains = [
    "images.pexels.com",
    "images.unsplash.com",
    "plus.unsplash.com",
  ];
  const NEW_WIDTH = newWidth ?? 300;
  const NEW_HEIGHT = newHeight ?? 180;

  try {
    const urlObj = new URL(url);
    const domainMatched = allowedDomains.some((domain) =>
      urlObj.hostname.includes(domain),
    );
    if (domainMatched) {
      urlObj.searchParams.set("w", NEW_WIDTH);
      urlObj.searchParams.set("h", NEW_HEIGHT);

      return urlObj.toString();
    }
  } catch (error) {
    console.error("Invalid URL", error);
  }

  return url;
}
