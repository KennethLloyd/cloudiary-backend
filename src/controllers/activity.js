const { Activity } = require('../models');

const addActivity = async (req, res) => {
  try {
    const newActivity = new Activity({ name: req.body.name });

    await newActivity.save();

    res.status(201).send({ activity: newActivity });
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const editActivity = async (req, res) => {
  try {
    const editedActivity = await Activity.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
    });

    res.send({ activity: editedActivity });
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find({});

    res.send(activities);
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

module.exports = {
  addActivity,
  editActivity,
  getActivities,
};
