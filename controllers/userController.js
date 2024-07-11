'use strict';

const firebase = require('../db');
const User = require('../models/user');
const firestore = firebase.firestore();

// GET ALL
const getAllUsers = async (req, res, next) => {
    try {
      const users = await firestore.collection('users');
      const data = await users.get();
      const usersArray = [];
      if (data.empty) {
        res.status(404).send('No users found');
      } else {
        data.forEach(doc => {
          const user = new User(
            doc.id,
            doc.data().namaUser,
            doc.data().emailUser,
            doc.data().noTelpUser,
            doc.data().username,
            doc.data().password
          );
          usersArray.push(user);
        });
        res.send(usersArray);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
}  

// GET BY ID
const getUserById = async (req, res, next) => {
    try {
        const idUser = req.params.idUser;
        const user = await firestore.collection('users').doc(idUser);
        const data = await user.get();
        if (!data.exists) {
            res.status(404).send('User with the given ID not found');
        } else {
            res.send(data.data());  
        }
    } catch (error) {
        req.status(400).send(error.message);
    }
}

// POST NEW USER
const addNewUser = async (req, res) => {
    try {
      const data = req.body;
      await firestore.collection('users').doc().set(data);
      res.send('Record saved successfully')
    } catch (error) {
      res.status(404).send(error.message);
    }
  }
  
// PUT USER
const editUser = async (req, res, next) => {
    try {
        const iduser = req.params.idUser;
        const user = await firestore.collection('users').doc(iduser);
        const data = req.body
        const users = await user.get();
        if (!users.exists) {
            res.status(404).send('No user found');
        }
        await user.update(data);
        res.send('Record updated successfully');
    } catch (error) {
        res.status(404).send(error.message);
    }
}

// DELETE USER
const deleteUser = async (req, res, next) => {
    try {
        const idUser = req.params.idUser;
        const user = await firestore.collection('users').doc(idUser);
        const users = await user.get();
        if (!users.exists) {
            res.status(404).send('No user found');
        }
        await user.delete();
        res.send('Delete data successfully');
    } catch (error) {
        res.status(404).send(error.message);
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    addNewUser,
    editUser,
    deleteUser
}