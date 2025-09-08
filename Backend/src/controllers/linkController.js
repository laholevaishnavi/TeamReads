import Link from "../models/Link.js";
import { scrapeLinkMetadata } from "../utils/linkScraper.js"; // Navin service import kara

export const addLink = async (req, res) => {
  // === FIX: Data la tyachya barobar jaagevarun ghya ===
  const { url } = req.body;         // URL body madhun
  const { teamId } = req.params;      // teamId URL parameters madhun
  const userId = req.user.id;       // userId token (req.user) madhun

  // Validation check
  if (!url || !teamId || !userId) {
    return res.status(400).json({ error: "URL, teamId, and userId are required" });
  }

  try {
    // 1. Scraping sathi service la call kara
    // Tumhala scrapeLinkMetadata import karava lagel
    // import { scrapeLinkMetadata } from "../utils/linkScraper.js";
    const metadata = await scrapeLinkMetadata(url);

    // 2. Scrape kelela data sobat link DB madhe save kara
    const newLink = await Link.create({
      url,
      title: metadata.title,
      description: metadata.description,
      image: metadata.image,
      teamId,
      userId,
    });
    
    // Member chi mahiti populate karun pathava
    const populatedLink = await Link.findById(newLink._id).populate({
        path: 'userId',
        select: 'firstName lastName'
    });

    res.status(201).json(populatedLink);

  } catch (err) {
    console.error(`Scraping/DB error for URL [${url}]:`, err.message);

    // 3. Fallback logic
    try {
      const fallbackLink = await Link.create({
        url,
        title: url,
        description: "Could not generate a preview for this link.",
        image: null,
        teamId,
        userId,
      });
      // Ithe pan populate karu shakto
      const populatedFallback = await Link.findById(fallbackLink._id).populate({
        path: 'userId',
        select: 'firstName lastName'
    });
      res.status(201).json(populatedFallback);
    } catch (dbError) {
      console.error(`Fallback DB save failed for URL [${url}]:`, dbError.message);
      res.status(500).json({ error: "Failed to add link." });
    }
  }
};

export const getLinks = async (req, res) => {
  try {
    const { teamId } = req.params;
    // Populate kara user chi mahiti (fakt garjechi)
    const links = await Link.find({ teamId })
      .populate({
        path: "userId",
        select: "firstName lastName email", // Link कोणी add keli he dakhvayla
      })
      .sort({ createdAt: -1 });

    res.status(200).json(links);
  } catch (err) {
    console.error("getLinks error:", err);
    res.status(500).json({ error: "Failed to retrieve links." });
  }
};

export const deleteLink = async (req, res) => {
  try {
    const { linkId } = req.params;
    // req.user.id ha 'protect' middleware madhun yeto,
    // jo token madhun logged-in user chi ID kadhto.
    const loggedInUserId = req.user.id; 

    // 1. Adhi link shodha
    const link = await Link.findById(linkId);

    // 2. Jar link sapdli nahi tar error dya
    if (!link) {
      return res.status(404).json({ message: "Link not found." });
    }

    // 3. SECURITY CHECK 🔐: Jo user delete karaycha prayatna kartoy,
    // tyanech ti link banavli ahe ka?
    if (link.userId.toString() !== loggedInUserId) {
      return res.status(403).json({ message: "Forbidden: You can only delete your own links." });
    }

    // 4. Jar sagla barobar asel tar link delete kara
    await Link.findByIdAndDelete(linkId);

    res.status(200).json({ message: "Link deleted successfully." });

  } catch (err) {
    console.error("deleteLink error:", err);
    res.status(500).json({ error: "Failed to delete the link." });
  }
};