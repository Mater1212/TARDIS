const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json()); 

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// MongoDB connection
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
  });

// Model
const Note = require('./models/Note');

// Route to save a note
app.post('/api/notes', async (req, res) => {
  try {
    const note = new Note({ content: req.body.content });
    const saved = await note.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

