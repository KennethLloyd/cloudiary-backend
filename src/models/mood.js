const mongoose = require('mongoose');

const moodSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  icon: {
    type: String,
    required: true,
    trim: true,
  },
});

const Mood = mongoose.model('Mood', moodSchema);

module.exports = Mood;
