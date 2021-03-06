const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const moodSchema = mongoose.Schema(
  {
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
    owner: {
      type: ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true },
);

const Mood = mongoose.model('Mood', moodSchema);

module.exports = Mood;
