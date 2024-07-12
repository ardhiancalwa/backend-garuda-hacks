'use strict';

const firebase = require('../db');
const Mentor = require('../models/mentor');

// GET ALL MENTOR
const getAllMentor = async (req, res, next) => {
    try {
        const mentors = await firebase.collection('mentors');
        const data = await mentors.get();
        const mentorArray = [];
        if (data.empty) {
            res.statu(404).send('No mentors found');
        } else {
            data.forEach(doc => {
                const mentor = new Mentor(
                  doc.id,
                  doc.data().namaMentor,
                  doc.data().usernameMentor,
                  doc.data().passwordMentor,
                  doc.data().emailUser,
                  doc.data().noTelpUser,
                  doc.data().Job,
                );
                mentorArray.push(mentor);
              });
              res.send(mentorArray);
        }
    } catch (error) {
        
    }
}

// GET BY ID MENTOR
const getMentorById = async (req, res, next) => {
    try {
        const idMentor = req.params.idMentor;
        const mentor = await firebase.collection('mentors').doc(idMentor);
        const data = await mentor.get();
        if (!data.exists) {
            res.status(404).send('Mentor with the given ID not found');
        } else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// POST NEW MENTOR
const addNewMentor =  async (req, res) => {
    try {
        const data = req.body;
        await firebase.collection('mentors').doc().set(data);
        res.send('Record data saved successfully');
    } catch (error) {
        res.status(404).send(error.message);
    }
}

// PUT MENTOR
const editMentor = async (req, res, next) => {
    try {
        const idmentor =  req.params.idMentor;
        const mentor = await firebase.collection('mentors').doc(idmentor);
        const data = req.body;
        const mentors = await mentor.get();
        if (!mentors.exists) {
            res.status(404).send('No mentor found');
        }
        await mentor.update(data);
        res.send('Record updated successfully');
    } catch (error) {
       res.status(404).send(error.message); 
    }
}

// DELETE MENTOR
const deleteMentor = async (req, res) => {
    try {
        const idmentor = req.params.idMentor;
        const mentor = await firebase.collection('mentors').doc(idmentor);
        const mentors = await mentor.get();
        if (!mentors.exists) {
            res.status(404).send('No mentor found');
        }
        await mentor.delete();
        res.send('Delete data successfully');
    } catch (error) {
        res.status(404).send(error.message);
    }
}

module.exports = {
    getAllMentor,
    getMentorById,
    addNewMentor,
    editMentor,
    deleteMentor
}