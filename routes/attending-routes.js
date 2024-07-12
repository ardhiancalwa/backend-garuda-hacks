const express = require('express');
const {
    getAllAttending,
    addNewAttending,
    editAttending
} = require('../controllers/attendingController');

const multer = require('multer');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// API
router.get('/attends', getAllAttending);
router.post('/attends', addNewAttending);
router.put('/attends/:idProject&&idUser', editAttending);

module.exports = {
    routes: router
  }