const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().collection('users').find().toArray();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération', error: err });
  }
};

const getSingle = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const user = await mongodb.getDatabase().collection('users').findOne({ _id: userId });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
  } catch (err) {
    res.status(400).json({ message: 'ID invalide', error: err });
  }
};

const createUser = async (req, res) => {
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  try {
    const response = await mongodb.getDatabase().collection('users').insertOne(user);
    res.status(201).json({ id: response.insertedId });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la création', error: err });
  }
};

const updateUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  try {
    const response = await mongodb.getDatabase().collection('users').replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Utilisateur non trouvé ou inchangé' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour', error: err });
  }
};

const deleteUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  try {
    const response = await mongodb.getDatabase().collection('users').deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression', error: err });
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser
};
