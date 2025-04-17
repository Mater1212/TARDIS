const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());


// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use routes
const eventRoutes = require('./routes/events');
app.use('/api/events', eventRoutes);

const signupRoute = require('./routes/signup');
app.use('/signup', signupRoute);

const verifyRoute = require('./routes/verify');
app.use('/verify', verifyRoute);

const loginRoute = require('./routes/login');
app.use('/login', loginRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});