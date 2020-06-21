const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const entrySchema = mongoose.Schema(
  {
    entryDate: {
      type: Date,
      required: true,
    },
    title: {
      type: String,
      default: 'Untitled',
      trim: true,
    },
    body: {
      type: String,
      default: '',
      trim: true,
    },
    mood: {
      type: ObjectId,
      required: true,
      ref: 'Mood',
    },
    activities: [
      {
        type: ObjectId,
        ref: 'Activity',
      },
    ],
    owner: {
      type: ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true },
);

const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;
