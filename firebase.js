const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');
const config = require('./config.js');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: 'garuda-hack-win.appspot.com'
    });
}

const firestore = admin.firestore();
firestore.settings({ ignoreUndefinedProperties: true });

const bucket = admin.storage().bucket();

module.exports = { firestore, bucket, admin };
