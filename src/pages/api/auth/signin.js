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

    if (doc.exists) {
      // console.log(doc.data());
    }

    res.status(200).json(tokenClaims);
  } catch (error) {
    res.status(400).json(error);
  }
};
