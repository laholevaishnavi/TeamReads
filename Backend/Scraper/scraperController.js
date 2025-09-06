import axios from "axios";
import * as cheerio from "cheerio";

export const scrapePreview = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ success: false, message: "URL is required" });
    }

    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
      },
    });

    const html = response.data;
    const $ = cheerio.load(html);

    const title =
      $('meta[property="og:title"]').attr("content") || $("title").text();
    const description = $('meta[property="og:description"]').attr("content");
    const image = $('meta[property="og:image"]').attr("content");

    res.json({ success: true, title, description, image });
  } catch (error) {
    console.error("Error during scraping:", error.message);
    res.status(500).json({ success: false, message: "Scraping failed." });
  }
};
