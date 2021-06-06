import * as admin from "firebase-admin";
// import "firebase/auth";
// import "firebase/functions";
// import "firebase/firestore";
const serviceAccount = require("./service-accounts-file.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: process.env.PROJECT_ID,
  });
}

export default admin;
