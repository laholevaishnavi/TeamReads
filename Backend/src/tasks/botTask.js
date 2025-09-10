import axios from 'axios';
import Team from '../models/Team.js';
import Link from '../models/Link.js';
import { generateSearchQuery } from '../services/geminiService.js';
import { getNewsBotId } from '../config/seed.js'; 

export async function findAndPostArticles() {
    const newsBotId = getNewsBotId(); // fro bot id import
    if (!newsBotId) {
        console.log('Bot task cannot run, NewsBot ID not found.');
        return;
    }
    console.log('Starting daily bot task...');
    const allTeams = await Team.find({});

    for (const team of allTeams) {
        try {
            const recentLinks = await Link.find({ teamId: team._id }).sort({ createdAt: -1 }).limit(10);
            const existingUrls = await Link.find({ teamId: team._id }).select('url');
            const urlSet = new Set(existingUrls.map(link => link.url));

            const query = await generateSearchQuery(team.description, recentLinks);
            if (!query) {
                console.log(`Skipping team ${team.name}: Could not generate query.`);
                continue;
            }

            const newsResponse = await axios.get(`https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${process.env.NEWS_API_KEY}`);
            const articleToPost = newsResponse.data.articles.find(article => article.url && !urlSet.has(article.url));

            if (articleToPost) {
                const newLink = new Link({
                    url: articleToPost.url,
                    title: articleToPost.title,
                    description: articleToPost.description,
                    image: articleToPost.urlToImage,
                    teamId: team._id,
                    userId: newsBotId,
                    userId: team.members[0],
                    postedBy: 'NewsBot',
                });
                await newLink.save();
                console.log(`Posted article for team "${team.name}": ${newLink.title}`);
            }
        } catch (error) {
            console.error(`Error processing team ${team.name}:`, error);
        }
    }
    console.log('Daily bot task finished.');
}