const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Alert = require('../models/Alert');

router.post('/subscribe', async (req, res) => {
  try {
    const { email, preferences, frequency } = req.body;
    const user = await User.findOneAndUpdate(
      { email },
      { preferences, frequency },
      { upsert: true, new: true }
    );
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/latest', async (req, res) => {
  const alerts = await Alert.find().sort({ createdAt: -1 }).limit(10);
  res.json(alerts);
});

module.exports = router;
