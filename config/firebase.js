require('dotenv').config();
const admin = require('firebase-admin');
const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS); 

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'garuda-hack-win.appspot.com' 
});

const firestore = admin.firestore();
firestore.settings({ ignoreUndefinedProperties: true });
const bucket = admin.storage().bucket();

module.exports = { firestore, bucket };
