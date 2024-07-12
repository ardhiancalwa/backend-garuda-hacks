'use strict';

const firebase = require('../db');
const Attending = require('../models/attending');
const { bucket } = require('../firebase');
const multer = require('multer');
const admin = require('firebase-admin');

// GET ALL
const getAllAttending = async (req, res, next) => {
    try {
        const attend = await firebase.collection('attends');
        const data = await attend.get();
        const attendsArray = [];
        if (data.empty) {
            res.status(404).send('No score found');
        } else {
            data.forEach(doc => {
            const attend = new Score(
                doc.idProject().idProject,
                doc.idUser().idUser,
                doc.coverletter().coverletter,
                doc.status().status,
            );
            attendsArray.push(attend);
            });
            res.send(attendsArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// POST
const addNewAttending = async (req, res) => {
    try {
       const {
        idProject,
        idUser,
        status
       } = req.body;
       let coverletterUrl = null
       if (req.file) {
        const blob = bucket.file(`coverletter/${Date.now()}-${req.file.originalname}`);
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

                const newProject = new Project(idProject, idUser, coverletterUrl, status);
                await admin.firestore().collection('attends').doc().set({
                    idProject: newProject.idProject,
                    idUser: newProject.idUser,
                    coverletterUrl: newProject.coverletterUrl,
                    status: newProject.status,
                });
                res.send('Attending added successfully');
            });

            blobStream.end(req.file.buffer);
       } else {
            const newProject = new Project(idProject, idUser, null, status);
                    await admin.firestore().collection('attends').doc().set({
                        idProject: newProject.idProject,
                        idUser: newProject.idUser,
                        coverletterUrl: newProject.coverletterUrl,
                        status: newProject.status,
                    });
                    res.send('Attending added successfully');
       }
    } catch (error) {
        res.status(404).send(error.message);
    }
}

// PUT
const editAttending = async (req, res) => {
    try {
        const idProject = req.params.idProject;
        const idUser = req.params.idUser;

        const projectScoreRef = firebase.collection('attends').doc(idProject);
        const scoringRef = await projectScoreRef.get();
        if (!scoringRef.exists) {
            return res.status(404).send('No project found');
        }
        if (scoringRef.data().idUser !== idUser) {
            return res.status(405).send('id user not authorized');
        }
        await scoringRef.update(data);
        res.send('Record updated successfully');
    } catch (error) {
        res.status(404).send(error.message); 
    }
}

module.exports = {
    getAllAttending,
    addNewAttending,
    editAttending
}



