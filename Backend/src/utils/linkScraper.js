import axios from "axios";
import * as cheerio from "cheerio";

/**
 * Helper function to convert relative image URLs to absolute ones.
 * e.g., /image.jpg -> https://example.com/image.jpg
 */
function normalizeImageUrl(imageUrl, pageUrl) {
  if (!imageUrl) return null;
  // Handle protocol-relative URLs like //example.com/img.jpg
  if (imageUrl.startsWith("//")) {
    return "https:" + imageUrl;
  }
  // Use URL constructor to resolve relative paths
  try {
    return new URL(imageUrl, pageUrl).href;
  } catch (e) {
    // If it's already a valid absolute URL or invalid, return as is
    return imageUrl;
  }
}

/**
 * Scrapes a URL to extract metadata (title, description, image).
 * @param {string} url - The URL to scrape.
 * @returns {Promise<object>} - A promise that resolves to an object with title, description, and image.
 */
export const scrapeLinkMetadata = async (url) => {
  // 1. Fetch the HTML content from the URL
  const response = await axios.get(url, {
    timeout: 15000, // Thoda jast timeout thevne changle
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.5",
    },
  });
  const html = response.data;
  const $ = cheerio.load(html);

  // 2. Extract metadata with robust fallbacks
  const title =
    $('meta[property="og:title"]').attr("content")?.trim() ||
    $('meta[name="twitter:title"]').attr("content")?.trim() ||
    $("title").first().text().trim() ||
    url;

  const description =
    $('meta[property="og:description"]').attr("content")?.trim() ||
    $('meta[name="description"]').attr("content")?.trim() ||
    $('meta[name="twitter:description"]').attr("content")?.trim() ||
    $("p").first().text().trim().slice(0, 240) || // Limit description length
    "";

  const rawImage =
    $('meta[property="og:image"]').attr("content") ||
    $('meta[name="twitter:image"]').attr("content") ||
    $('link[rel="icon"]').attr("href") || // Favicon as a fallback
    $("img").first().attr("src") ||
    null;

  const image = normalizeImageUrl(rawImage, url);

  // 3. Return the extracted data
  return { title, description, image };
};