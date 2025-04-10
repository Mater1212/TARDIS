const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  location: String,
  date: Date,
  time: String,
  capacity: Number,
  status: {
    type: String,
    enum: ['open', 'closed', 'full'],
    default: 'open'
  },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  imageUrl: String
});

module.exports = mongoose.model('Event', EventSchema);
