const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/@uga\.edu$/, 'Only UGA emails allowed'],
    },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    imageUrl: { type: String, default: '' },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    verificationTokenExpires: { type: Date },
    rsvpedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
    postedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
    bookmarkedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
  },
  { timestamps: true }
);

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
