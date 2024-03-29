import * as admin from "firebase-admin";
// import "firebase/auth";
// import "firebase/functions";
// import "firebase/firestore";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      type: "service_account",
      project_id: "restaurants-review-7dcfa",
      private_key_id: process.env.PRIVATE_KEY_ID,
      private_key: process.env.PRIVATE_KEY,
      client_email: process.env.CLIENT_EMAIL,
      client_id: "118411454359857301966",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url:
        "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-bflmx%40restaurants-review-7dcfa.iam.gserviceaccount.com",
    }),
    projectId: process.env.PROJECT_ID,
  });
}

export default admin;
