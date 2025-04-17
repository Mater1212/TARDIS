const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.get('/:token', async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).send('Invalid or expired verification link.');
    }

    // Check if token is expired
    if (user.verificationTokenExpires < Date.now()) {
      return res.status(400).send('Verification link has expired.');
    }

    // Mark user as verified
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    // You could also redirect to a login page or show a success screen
    res.send('Email verified successfully! You can now log in.');
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).send('Something went wrong while verifying your email.');
  }
});

module.exports = router;
