// import restaurant from "../models/restaurant.js";

const restaurant = require("../models/restaurant.js");

/* CREATE → insertOne*/

exports.insertOne = async (req, res) => {
  try {
    const data = await restaurant.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/* CREATE → insertMany*/

exports.insertMany = async (req, res) => {
  try {
    const data = await restaurant.insertMany(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/* READ → find (all + projection + sort + limit + skip) */

exports.getRestaurants = async (req, res) => {
  try {
    const {
      sortBy = "rating",
      order = "desc",
      limit = 10,
      skip = 0
    } = req.query;

    const data = await restaurant.find()

      // PROJECTION
      .select({
        name: 1,
        cuisine: 1,
        rating: 1,
        _id: 1
      })

      // SORTING
      .sort({ [sortBy]: order === "desc" ? -1 : 1 })

      // LIMIT & SKIP
      .limit(Number(limit))
      .skip(Number(skip));

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ===================================================
   READ → findOne + projection
=================================================== */
exports.findOne = async (req, res) => {
  try {
    const data = await restaurant.findOne(
      { name: req.params.name },   // $eq internally
      { name: 1, address: 1, rating: 1, _id: 0 } // projection
    );

    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/* ===================================================
   READ → Operators ($gt,$lt,$eq,$ne,$and,$or)
=================================================== */
exports.operatorsDemo = async (req, res) => {
  try {
    const data = await restaurant.find({
      /* LOGICAL OPERATORS */
      $or: [
        {
          /* COMPARISON OPERATORS */
          rating: { $gt: 4 }
        },
        {
          cuisine: { $eq: "Indian" }
        }
      ],

      $and: [
        {
          rating: { $ne: 0 }
        }
      ]
    });

    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/* ===================================================
   UPDATE → updateOne ($set,$inc,$push,$pull)
=================================================== */
exports.updateOne = async (req, res) => {
  try {
    const data = await restaurant.updateOne(
      { _id: req.params.id },

      {
        /* $set */
        $set: {
          address: req.body.address
        },

        /* $inc */
        $inc: {
          rating: 1
        },

        /* $push */
        $push: {
          menu: req.body.menuItem
        },

        /* $pull */
        $pull: {
          menu: { item: req.body.removeItem }
        }
      }
    );

    res.json({ message: "updateOne done", data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/* ===================================================
   UPDATE → updateMany ($set,$inc)
=================================================== */
exports.updateMany = async (req, res) => {
  try {
    const data = await restaurant.updateMany(
      { cuisine: req.body.cuisine },

      {
        $set: { isOpen: false },

        $inc: { rating: 2 }
      }
    );

    res.json({ message: "updateMany done", data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/* ===================================================
   DELETE → deleteOne
=================================================== */
exports.deleteOne = async (req, res) => {
  try {
    const data = await restaurant.deleteOne(
      { _id: req.params.id }
    );

    res.json({ message: "deleteOne done", data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/* ===================================================
   DELETE → deleteMany
=================================================== */
exports.deleteMany = async (req, res) => {
  try {
    const data = await restaurant.deleteMany({
      rating: { $lt: 2 }
    });

    res.json({ message: "deleteMany done", data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/* ===================================================
   ADVANCED READ → projection, sorting, limit & skip
=================================================== */
exports.advancedFind = async (req, res) => {
  try {
    const data = await restaurant.find({
      rating: { $gt: 3, $lt: 5 }
    })

      // projection
      .select("name cuisine rating")

      // sorting
      .sort({ name: 1 })

      // limit & skip
      .limit(5)
      .skip(2);

    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

