const express = require('express');
const {
    getAllProject,
    addNewProject,
    editProject,
    deleteProject
} = require('../controllers/projectController');

const multer = require('multer');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// API
router.get('/project', getAllProject);
router.post('/project', upload.single('logoProject'),addNewProject);
router.put('/project/:idProject', editProject);
router.delete('/project/:idProject', deleteProject);

module.exports = {
    routes: router
  }