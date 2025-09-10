import Link from "../models/Link.js";
import { scrapeLinkMetadata } from "../utils/linkScraper.js"; // Navin service import kara

export const addLink = async (req, res) => {
  const { url } = req.body;         // from URL body 
  const { teamId } = req.params;      // from teamId URL parameters 
  const userId = req.user.id;       // from userId token (req.user) 

  // Validation check
  if (!url || !teamId || !userId) {
    return res.status(400).json({ error: "URL, teamId, and userId are required" });
  }

  try {
    // import { scrapeLinkMetadata } from "../utils/linkScraper.js";
    const metadata = await scrapeLinkMetadata(url);

    const newLink = await Link.create({
      url,
      title: metadata.title,
      description: metadata.description,
      image: metadata.image,
      teamId,
      userId,
    });
    
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
    const { search } = req.query; 

    const filter = { teamId: teamId };

    // If a search term was provided in the URL, add a search condition
    if (search) {
      // for the search term. The 'i' makes it case-insensitive.
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Use our new dynamic 'filter' object in the database query
    const links = await Link.find(filter)
      .populate({
        path: "userId",
        select: "firstName lastName email",
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
    const loggedInUserId = req.user.id; 

    const link = await Link.findById(linkId);

    if (!link) {
      return res.status(404).json({ message: "Link not found." });
    }

    // 3. SECURITY CHECK 
    if (link.userId.toString() !== loggedInUserId) {
      return res.status(403).json({ message: "Forbidden: You can only delete your own links." });
    }

    await Link.findByIdAndDelete(linkId);

    res.status(200).json({ message: "Link deleted successfully." });

  } catch (err) {
    console.error("deleteLink error:", err);
    res.status(500).json({ error: "Failed to delete the link." });
  }
};