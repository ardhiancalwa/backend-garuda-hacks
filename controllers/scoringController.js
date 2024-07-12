'use strict';

const firebase = require('../db');
const Score = require('../models/score')

// GET ALL
const getAllScoring = async (req, res, next) => {
    try {
        const scores = await firebase.collection('scores');
        const data = await scores.get();
        const scoresArray = [];
        if (data.empty) {
            res.status(404).send('No score found');
        } else {
            data.forEach(doc => {
            const score = new Score(
                doc.id,
                doc.idProject().idProject,
                doc.idMentor().idMentor,
                doc.idUser().idUser,
                doc.score().score,
                doc.feedbackCV().feedbackCV,
                doc.feedbackProject().feedbackProject
            );
            scoresArray.push(score);
            });
            res.send(scoresArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// GET BY ID PROJECT
const getScoringById = async (req, res, next) => {
    try {
        const idProject = req.params.idProject;
        const scoring = await firebase.collection('scores').doc(idProject);
        const data = await scoring.get();
        if (!data.exists) {
            res.status(404).send('Scoring with the given ID Project not found');
        } else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// POST 
const addScoringProject = async (req, res) => {
    try {
        const data = req.body;
        await firebase.collection('scores').doc().set(data);
        res.send('Record data saved successfully');
    } catch (error) {
        res.status(404).send(error.message);
    }
}

// PUT
const editScoringProject = async (req, res) => {
    try {
        const idProject = req.params.idProject;
        const idUser = req.params.idUser;

        const projectScoreRef = firebase.collection('scores').doc(idProject);
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

// DELETE
const deleteScoringProject = async (req, res) => {
    try {
        const projectScoreRef = firebase.collection('scores').doc(idProject);
        const scoringRef = await projectScoreRef.get();
        if (!scoringRef.exists) {
            return res.status(404).send('No project found');
        }
        if (scoringRef.data().idUser !== idUser) {
            return res.status(405).send('id user not authorized');
        }
        await scoringRef.delete();
        res.send('Record delete successfully');
    } catch (error) {
        res.status(404).send(error.message); 
    }
}

module.exports = {
    getAllScoring,
    getScoringById,
    addScoringProject,
    editScoringProject,
    deleteScoringProject
}