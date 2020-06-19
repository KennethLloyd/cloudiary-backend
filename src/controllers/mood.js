const { Mood } = require('../models');

const addMood = async (req, res) => {
  try {
    const newMood = new Mood({ name: req.body.name });

    await newMood.save();

    res.status(201).send({ mood: newMood });
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const getMoods = async (req, res) => {
  try {
    const moods = await Mood.find({});

    res.send(moods);
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

module.exports = {
  addMood,
  getMoods,
};
