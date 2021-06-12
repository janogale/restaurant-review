/* eslint-disable import/no-unresolved */
import firebase from "@/lib/firebase";
import admin from "@/lib/firebase-admin";

const db = admin.firestore();

export default async (req, res) => {
  const { password, email } = req.body;
  try {
    const response = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    const { user } = response;

    // fetch user details from firestore db
    const refDoc = db.collection("users").doc(user.uid);
    const doc = await refDoc.get();

    // get user claims
    const tokenClaims = await firebase.auth().currentUser.getIdTokenResult();

    // only fetch claims and token to send it to frontend
    const { claims, token } = tokenClaims;

    const userData = { claims, token };

    if (doc.exists) {
      userData.details = doc.data();
    }

    res.status(200).json(userData);
  } catch (error) {
    res.status(400).json(error);
  }
};
