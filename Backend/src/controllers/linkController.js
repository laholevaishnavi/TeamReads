// backend/src/controllers/linkController.js
import axios from "axios";
// import cheerio from "cheerio";
import * as cheerio from "cheerio";

import Link from "../models/Link.js";

/**
 * Helper: normalize possible relative///image urls into absolute
 */
function normalizeImageUrl(imageUrl, pageUrl) {
  if (!imageUrl) return null;
  // protocol-relative //example.com/img.jpg
  if (imageUrl.startsWith("//")) return "https:" + imageUrl;
  try {
    // resolve relative urls
    return new URL(imageUrl, pageUrl).href;
  } catch (e) {
    return imageUrl;
  }
}

export const addLink = async (req, res) => {
  try {
    const { url, teamId, userId } = req.body;
    if (!url || !teamId || !userId) {
      return res.status(400).json({ error: "url, teamId and userId are required" });
    }

    // fetch HTML
    const response = await axios.get(url, {
      timeout: 10000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
      },
    });

    const html = response.data;
    const $ = cheerio.load(html);

    // robust picks (og first, twitter fallback, then title/meta/first p)
    const title =
      $('meta[property="og:title"]').attr("content") ||
      $('meta[name="twitter:title"]').attr("content") ||
      $("title").first().text().trim() ||
      url;

    const description =
      $('meta[property="og:description"]').attr("content") ||
      $('meta[name="description"]').attr("content") ||
      $('meta[name="twitter:description"]').attr("content") ||
      $("p").first().text().trim().slice(0, 240) ||
      "";

    const rawImage =
      $('meta[property="og:image"]').attr("content") ||
      $('meta[name="twitter:image"]').attr("content") ||
      $("img").first().attr("src") ||
      null;

    const image = normalizeImageUrl(rawImage, url);

    // Save to DB
    const newLink = await Link.create({
      url,
      title,
      description,
      image,
      teamId,
      userId,
    });

    // Return saved doc
    res.status(201).json(newLink);
  } catch (err) {
    console.error("addLink error:", err?.message || err);
    // fallback: save minimal record (so frontend still sees link)
    try {
      const { url, teamId, userId } = req.body;
      const fallback = await Link.create({
        url,
        title: url,
        description: "Preview not available",
        image: null,
        teamId,
        userId,
      });
      return res.status(201).json(fallback);
    } catch (e) {
      return res.status(500).json({ error: "Failed to add link" });
    }
  }
};

export const getLinks = async (req, res) => {
  try {
    const { teamId } = req.params;
    const links = await Link.find({ teamId }).sort({ createdAt: -1 });
    res.json(links);
  } catch (err) {
    console.error("getLinks error:", err);
    res.status(500).json({ error: err.message });
  }
};

















// import Link from "../models/Link.js";
// import * as cheerio from "cheerio";
// import axios from "axios";

// export const addLink = async (req, res) => {
//   try {
//     const { url, teamId, userId } = req.body;

//     // 1. scrape data
//     const response = await axios.get(url, {
//       headers: {
//         "User-Agent":
//           "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
//       },
//     });

//     const html = response.data;
//     const $ = cheerio.load(html);

//     const title =
//       $('meta[property="og:title"]').attr("content") || $("title").text();
//     const description =
//       $('meta[property="og:description"]').attr("content") || "No Description";
//     const image = $('meta[property="og:image"]').attr("content") || "";

//     // 2. save to DB
//     const link = new Link({
//       url,
//       title,
//       description,
//       image,
//       teamId,
//       userId,
//     });

//     await link.save();

//     res.status(201).json(link);
//   } catch (err) {
//     console.error("Scrape Error:", err.message);
//     res.status(500).json({ error: "Failed to add link" });
//   }
// };

// export const getLinks = async (req, res) => {
//   try {
//     const { teamId } = req.params;
//     const links = await Link.find({ teamId }).sort({ createdAt: -1 });
//     res.json(links);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };









// import Link from "../models/Link.js";
// import { scrapeUrl } from "../utils/scraperApi.js";

// export const addLink = async (req, res) => {
//   try {
//     const { url, teamId, userId } = req.body;
//     const scraped = await scrapeUrl(url);

//     const newLink = await Link.create({
//       url,
//       title: scraped.title,
//       description: scraped.description,
//       teamId,
//       userId
//     });

//     res.json(newLink);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export const getLinks = async (req, res) => {
//   try {
//     const links = await Link.find({ team: req.params.teamId }).sort({ createdAt: -1 });
//     res.json(links);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


