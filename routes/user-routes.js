const express = require('express');
const { getAllUsers, getUserById, addNewUser, editUser, deleteUser } = require('../controllers/userController');

const multer = require('multer');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/users', getAllUsers);
router.get('/users/:idUser', getUserById);
router.post('/users', upload.none(), addNewUser);
router.put('/users/:idUser', editUser);
router.delete('/users/:idUser', deleteUser);

module.exports = {
  routes: router
}