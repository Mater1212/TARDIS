const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User');

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

router.post('/', async (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body;

  try {
    // Ensure email is a UGA email
    if (!email.endsWith('@uga.edu')) {
      return res.status(400).json({ error: 'Only @uga.edu emails are allowed' });
    }

    const existing = await User.findOne({ email });

    if (existing) {
      if (existing.isVerified) {
        return res.status(409).json({ error: 'User already exists' });
      }

      // Token still valid and user not verified
      if (existing.verificationTokenExpires > Date.now()) {
        const newToken = crypto.randomUUID();
        existing.verificationToken = newToken;
        existing.verificationTokenExpires = new Date(Date.now() + 15 * 60 * 1000);

        // Update info
        existing.firstName = firstName;
        existing.lastName = lastName;
        existing.phone = phone;
        existing.password = await bcrypt.hash(password, 10);

        await existing.save();

        console.log(`Resending verification to ${email} with token ${newToken}`);

        try {
          await transporter.sendMail({
            from: `"UGA Event Hub" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: 'Verify your UGA email',
            html: `<p>Click <a href="http://localhost:3000/verify?token=${newToken}">here</a> to verify your account. This link will expire in 15 minutes.</p>`
          });
        } catch (emailErr) {
          console.error('Email send failed:', emailErr);
          return res.status(500).json({ error: 'Failed to send verification email.' });
        }

        return res.status(200).json({
          message: 'User already exists but was not verified. A new verification email has been sent.',
        });
      } else {
        // Token expired — delete user and allow re-registration
        await User.deleteOne({ email });
      }
    }

    // Create new user (either brand new, or after deleting expired record)
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = crypto.randomUUID();
    const tokenExpires = new Date(Date.now() + 15 * 60 * 1000);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      verificationToken: token,
      verificationTokenExpires: tokenExpires,
    });

    await newUser.save();

    console.log(`Sending verification email to ${email} with token ${token}`);

    try {
      await transporter.sendMail({
        from: `"UGA Event Hub" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: 'Verify your UGA email',
        html: `<p>Click <a href="http://localhost:3000/verify?token=${token}">here</a> to verify your account. This link will expire in 15 minutes.</p>`
      });
    } catch (emailErr) {
      console.error('Email send failed:', emailErr);
      return res.status(500).json({ error: 'Failed to send verification email.' });
    }

    res.status(201).json({
      message: 'User created successfully. Please check your email to verify your account.',
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Something went wrong during signup' });
  }
});

module.exports = router;
