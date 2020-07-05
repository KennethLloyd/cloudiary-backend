const { Activity } = require('../models');

const addActivity = async (req, res) => {
  try {
    const newActivity = new Activity({
      name: req.body.name,
      owner: req.user._id,
    });

    await newActivity.save();

    res.status(201).send({ activity: newActivity });
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find({ owner: req.user._id });

    res.send(activities);
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const editActivity = async (req, res) => {
  try {
    const editedActivity = await Activity.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
      },
      { new: true },
    );

    res.send({ activity: editedActivity });
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const deleteActivity = async (req, res) => {
  try {
    const deletedActivity = await Activity.findByIdAndDelete(req.params.id);

    res.send({ activity: deletedActivity });
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const insertInitialActivities = async (userId) => {
  const initialActivities = [
    { name: 'work', owner: userId },
    { name: 'travel', owner: userId },
    { name: 'friends', owner: userId },
    {
      name: 'family',
      owner: userId,
    },
    { name: 'self', owner: userId },
  ];

  try {
    const activities = await Activity.create(initialActivities);
    return activities;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = {
  addActivity,
  getActivities,
  editActivity,
  deleteActivity,
  insertInitialActivities,
};
