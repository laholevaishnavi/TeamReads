import User from '../models/User.js';

// This variable will hold our bot's ID once it's found or created.
let newsBotId = null;

export const getNewsBotId = () => newsBotId;

export const seedNewsBot = async () => {
  try {
    const botEmail = 'newsbot@system.io';
    let newsBot = await User.findOne({ email: botEmail });

    if (!newsBot) {
      console.log('NewsBot user not found. Creating one...');
      newsBot = new User({
        firstName: 'NewsBot',
        lastName: 'AI',
        email: botEmail,
        password: Math.random().toString(36), 
      });
      await newsBot.save({ validateBeforeSave: false }); // Skip password validation
      console.log('NewsBot user created successfully.');
    } else {
      console.log('NewsBot user already exists.');
    }

    newsBotId = newsBot._id;

  } catch (error) {
    console.error('Error ensuring NewsBot user exists:', error);
  }
};