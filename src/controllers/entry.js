const moment = require('moment');
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
  const filter = {
    owner: req.user._id,
  };
  const projection = null;
  const options = {};

  if (req.query.from && req.query.to) {
    filter.entryDate = {
      $gte: req.query.from,
      $lte: req.query.to,
    };
  } else {
    const thisMonth = moment().format('YYYY-MM');
    const nextMonth = moment().add(1, 'month').format('YYYY-MM');

    filter.entryDate = {
      $gte: `${thisMonth}-01`,
      $lte: `${nextMonth}-01`,
    };
  }

  if (req.query.sortBy) {
    let sortOrder = 'asc';

    if (
      req.query.sortOrder &&
      ['asc', 'desc'].includes(req.query.sortOrder.toLowerCase())
    ) {
      sortOrder = req.query.sortOrder.toLowerCase();
    }

    options.sort = {
      [req.query.sortBy]: sortOrder,
    };
  } else {
    options.sort = {
      entryDate: 'desc',
    };
  }

  try {
    const entries = await Entry.find(filter, projection, options)
      .populate('mood', 'name')
      .populate('activities', 'name')
      .exec();

    res.send(entries);
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const editEntry = async (req, res) => {
  try {
    const options = {
      new: true, // returns the updated document rather than the pre-update document
    };

    const updatedEntry = await Entry.findByIdAndUpdate(
      req.params.id,
      req.body,
      options,
    );

    res.status(200).send({ entry: updatedEntry });
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const deleteEntry = async (req, res) => {};

module.exports = {
  addEntry,
  getEntries,
  editEntry,
  deleteEntry,
};
