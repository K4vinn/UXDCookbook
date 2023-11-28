const admin = require("firebase-admin");

const serviceAccount = require("./firebase-credentials.json"); // Replace with your actual path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = { admin, db };
