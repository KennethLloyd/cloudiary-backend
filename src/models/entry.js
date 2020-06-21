const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const entrySchema = mongoose.Schema(
  {
    entryDate: {
      type: String,
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
    moodId: {
      type: ObjectId,
      required: true,
    },
    activityIds: {
      type: Array,
    },
  },
  { timestamps: true },
);

const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;
