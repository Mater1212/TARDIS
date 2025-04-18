const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    //finds the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    //Check if verified
    if (!user.isVerified) {
      return res.status(403).json({ error: 'Please verify your email before logging in' });
    }

    //Check password match
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    //Return user info (no password)
    res.status(200).json({
      message: 'Login successful',
      fullName: `${user.firstName} ${user.lastName}`,
      email: user.email,
      phone: user.phone
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Something went wrong during login' });
  }
});

module.exports = router;
