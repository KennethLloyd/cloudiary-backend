const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const activitySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true },
);

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
