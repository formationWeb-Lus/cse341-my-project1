// controllers/users.js
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().collection('users').find(); // ✅ "users" au pluriel
    const users = await result.toArray();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err });
  }
};

const getSingle = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().collection('users').find({ _id: userId });
    const users = await result.toArray();
    res.status(200).json(users[0]);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err });
  }
};

module.exports = {
  getAll,
  getSingle
};
