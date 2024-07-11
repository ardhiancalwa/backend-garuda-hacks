const express = require('express');
const {
    getAllMentor, getMentorById, addNewMentor, editMentor, deleteMentor
} = require('../controllers/mentorController');

const multer = require('multer');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// API
router.get('/mentor', getAllMentor);
router.get('/mentor/:idMentor', getMentorById);
router.post('/mentor', upload.none(), addNewMentor);
router.put('/mentor/:idMentor', editMentor);
router.delete('/mentor/:idMentor', deleteMentor);

module.exports = {
    routes: router
}