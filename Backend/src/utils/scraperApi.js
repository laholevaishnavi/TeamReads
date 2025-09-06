import axios from "axios";

export const scrapeUrl = async (url) => {
  const res = await axios.post("http://localhost:5001/scrape", { url });
  return res.data;
};

// // Instead of calling scraper API
// const title = "Dummy Title";
// const description = "Dummy description for testing.";
