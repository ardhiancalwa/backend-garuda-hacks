const express = require('express');
const {
    getAllScoring,
    getScoringById,
    addScoringProject,
    editScoringProject,
    deleteScoringProject
} = require('../controllers/scoringController');

const multer = require('multer');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/scores', getAllScoring);
router.get('/scores/:idProject', getScoringById);
router.post('/scores', addScoringProject);
router.put('/scores/:idProject', editScoringProject);
router.delete('/scores/:idProject', deleteScoringProject);

module.exports = {
    routes: router
  }