// server.js

// 1. Import the necessary libraries
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');

// 2. Create the Express application
const app = express();

// 3. Set up middleware
// This allows our server to understand JSON data sent from the frontend
app.use(express.json()); 
// This allows our HTML file to make requests to this server
app.use(cors()); 

// 4. Define our main scraping endpoint (the "listening ear")
// It listens for POST requests at the address '/api/scrape-preview'
app.post('/api/scrape-preview', async (req, res) => {
  // We wrap our code in a try...catch block to handle errors
  try {
    // Get the URL from the request body (this is the same as before)
    const { url } = req.body;

    // Use Axios to fetch the HTML. 'await' tells our code to wait here.
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
      }
    });
    const html = response.data;

// 2. Hand the blueprint to Cheerio to organize it. This is where '$' is created.
const $ = cheerio.load(html);
    // 1. Hunt for the Open Graph title, but fall back to the main <title> tag
    const title = $('meta[property="og:title"]').attr('content') || $('title').text();

    // 2. Hunt for the Open Graph description
    const description = $('meta[property="og:description"]').attr('content');

    // 3. Hunt for the Open Graph image URL
    const image = $('meta[property="og:image"]').attr('content');
    // For now, let's log it to the terminal to see if it worked
    console.log('Found Title:', title);
    console.log('Found Description:', description);
    console.log('Found Image:', image);

    // Send the found title back to the frontend
    res.json({ success: true, title: title, description: description, image: image });

  } catch (error) {
    // If anything in the 'try' block fails, this code will run
    console.error('Error during scraping:', error.message);
    res.status(500).json({ success: false, message: 'Scraping failed.' });
  }
});

// 5. Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running and listening on http://localhost:${PORT}`);
});