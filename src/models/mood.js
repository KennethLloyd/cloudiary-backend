const mongoose = require('mongoose');

const moodSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Mood = mongoose.model('Mood', moodSchema);

module.exports = Mood;
