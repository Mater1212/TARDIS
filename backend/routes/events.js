const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Create new event
router.post('/', async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    const saved = await newEvent.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Event creation error:', err);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().populate('createdBy', 'firstName lastName email');
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});


// Get one event
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('createdBy', 'firstName lastName email');
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch event' });
  }
});

// RSVP to an event
router.post('/:id/rsvp', async (req, res) => {
  const { userId } = req.body;

  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    const alreadyJoined = event.attendees.some(id => id.toString() === userId);
    if (!alreadyJoined) {
      event.attendees.push(userId);
      await event.save();
    }

    res.json({ message: 'RSVP successful', attendees: event.attendees });
  } catch (err) {
    console.error('RSVP error:', err);
    res.status(500).json({ error: 'RSVP failed' });
  }
});

// Cancel RSVP
router.post('/:id/rsvp/cancel', async (req, res) => {
  const { userId } = req.body;

  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    event.attendees = event.attendees.filter(
      id => id.toString() !== userId
    );

    await event.save();
    res.json({ message: 'RSVP cancelled', attendees: event.attendees });
  } catch (err) {
    console.error('Cancel RSVP error:', err);
    res.status(500).json({ error: 'Failed to cancel RSVP' });
  }
});

// DELETE event by ID (creator only)
router.delete('/:id', async (req, res) => {
  const { userId } = req.body;

  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    if (event.createdBy.toString() !== userId) {
      return res.status(403).json({ error: 'Not authorized to delete this event' });
    }

    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error('Delete event error:', err);
    res.status(500).json({ error: 'Failed to delete event' });
  }
});


module.exports = router;
