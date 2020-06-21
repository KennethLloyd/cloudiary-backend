const { Entry } = require('../models');

const addEntry = async (req, res) => {
  try {
    const newEntry = new Entry({
      ...req.body,
      owner: req.user._id,
    });

    await newEntry.save();

    res.status(201).send({ entry: newEntry });
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const getEntries = async (req, res) => {
  try {
    const entries = await Entry.find({});

    res.send(entries);
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const editEntry = async (req, res) => {};

const deleteEntry = async (req, res) => {};

module.exports = {
  addEntry,
  getEntries,
  editEntry,
  deleteEntry,
};
