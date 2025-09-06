import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export const apiScrapePreview = (url) => {
  return axios.post(`${API_BASE}/scrape-preview`, { url });
};
