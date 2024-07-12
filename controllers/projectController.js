'use strict';

const { bucket } = require('../firebase');
const Project = require('../models/project');
const multer = require('multer');
const admin = require('firebase-admin');
const firestore = admin.firestore();

const getAllProject = async (req, res, next) => {
    try {
        const projects = await firestore.collection('projects').get();
        const projectArray = [];
        if (projects.empty) {
            res.status(404).send('No projects found');
        } else {
            projects.forEach(doc => {
                const project = new Project(
                    doc.id,
                    doc.data().logoProject,
                    doc.data().nameProject,
                    doc.data().company,
                    doc.data().level,
                    doc.data().description,
                    doc.data().skills,
                    doc.data().rating,
                );
                projectArray.push(project);
            });
            res.send(projectArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const addNewProject = async (req, res, next) => {
    try {
        const {
            nameProject,
            company,
            level,
            description,
            skills,
            rating
        } = req.body;
        let logoProjectUrl = null;

        if (req.file) {
            const blob = bucket.file(`logoProject/${Date.now()}-${req.file.originalname}`);
            const blobStream = blob.createWriteStream({
                metadata: {
                    contentType: req.file.mimetype,
                },
            });

            blobStream.on('error', (err) => {
                return res.status(500).send({ message: err.message });
            });

            blobStream.on('finish', async () => {
                const [url] = await blob.getSignedUrl({
                    action: 'read',
                    expires: '03-01-2500',
                });
                logoProjectUrl = url;

                const newProject = new Project(logoProjectUrl, nameProject, company, level, description, skills, rating);
                await admin.firestore().collection('projects').doc().set({
                    logoProject: newProject.logoProject,
                    nameProject: newProject.nameProject,
                    company: newProject.company,
                    level: newProject.level,
                    description: newProject.description,
                    skills: newProject.skills,
                    rating: newProject.rating,
                });
                res.send('Project added successfully');
            });

            blobStream.end(req.file.buffer);
        } else {
            const newProject = new Project(null, nameProject, company, level, description, skills, rating);
            await admin.firestore().collection('projects').doc().set({
                logoProject: newProject.logoProject,
                nameProject: newProject.nameProject,
                company: newProject.company,
                level: newProject.level,
                description: newProject.description,
                skills: newProject.skills,
                rating: newProject.rating,
            });
            res.send('Project added successfully');
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
};

// EDIT
const editProject = async (req, res) => {
    try {
        const idProject = req.params.idProject;
        const project = await firestore.collection('projects').doc(idProject);
        const data = req.body;
        const projects = await project.get();
        if (!projects.exists) {
            res.status(404).send('No project found');
        }
        await project.update(data);
        res.send('Record updated successfully');
    } catch (error) {
        res.status(404).send(error.message); 
    }
}

// DELETE
const deleteProject = async (req, res) => {
    try {
        const idProject = req.params.idProject;
        const project = await firestore.collection('projects').doc(idProject);
        const projects = await project.get();
        if (!projects.exists) {
            res.status(404).send('No mentor found');
        }
        await project.delete();
        res.send('Delete data successfully');
    } catch (error) {
        res.status(404).send(error.message); 
    }
}

module.exports = {
    getAllProject,
    addNewProject,
    editProject,
    deleteProject
};
