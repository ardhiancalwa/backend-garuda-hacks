const firebase = require('firebase-admin');
const config = require('./config/config.js');

const db = firebase.initializeApp(config.firebaseConfig);

module.exports = db;