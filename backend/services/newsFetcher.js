const axios = require('axios');
const Alert = require('../models/Alert');
const User = require('../models/User');
const sendEmail = require('./emailService');

module.exports = async function fetchNewsAndSendEmails() {
  try {
    const res = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.NEWS_API_KEY}`);
    const articles = res.data.articles.slice(0, 5);
    const users = await User.find();

    for (const article of articles) {
      const alert = new Alert({
        title: article.title,
        description: article.description,
        category: 'general',
        url: article.url,
        sentTo: users.map(u => u.email),
      });

      await alert.save();

      for (const user of users) {
        await sendEmail(
          user.email,
          article.title,
          `${article.description}\n\nRead more: ${article.url}`
        );
      }
    }
  } catch (err) {
    console.error('Error fetching/sending news:', err.message);
  }
};
