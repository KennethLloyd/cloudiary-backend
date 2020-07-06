const { Mood } = require('../models');

const addMood = async (req, res) => {
  try {
    const newMood = new Mood({
      name: req.body.name.toLowerCase(),
      icon: req.body.icon,
      owner: req.user._id,
    });

    await newMood.save();

    res.status(201).send({ mood: newMood });
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const getMoods = async (req, res) => {
  try {
    const moods = await Mood.find({ owner: req.user._id });

    res.send(moods);
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const insertInitialMoods = async (userId) => {
  const initialMoods = [
    { name: 'fantastic', icon: 'smile-beam', owner: userId },
    { name: 'good', icon: 'smile', owner: userId },
    { name: 'meh', icon: 'meh', owner: userId },
    {
      name: 'bad',
      icon: 'frown',
      owner: userId,
    },
    { name: 'terrible', icon: 'sad-tear', owner: userId },
  ];

  try {
    const moods = await Mood.create(initialMoods);
    return moods;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = {
  addMood,
  getMoods,
  insertInitialMoods,
};
