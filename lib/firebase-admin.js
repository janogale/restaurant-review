import * as admin from "firebase-admin";
// import "firebase/auth";
// import "firebase/functions";
// import "firebase/firestore";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  });
}

export default admin;
