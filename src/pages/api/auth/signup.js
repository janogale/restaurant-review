import firebase from "../../../../lib/firebase";
import admin from "../../../../lib/firebase-admin";

const db = admin.firestore();

// eslint-disable-next-line consistent-return
export default async (req, res) => {
  const { password, email } = req.body;

  if (!firebase)
    return res.status(500).json({ message: "Firebase is undefined" });
  if (!db) return res.status(500).json({ message: "db is undefined" });

  try {
    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    const { user } = response;

    // store user to firestore
    await db.collection("users").doc(user.uid).set({
      uid: user.uid,
      email: user.email,
    });

    // add custom claims
    await admin
      .auth()
      .setCustomUserClaims(user.uid, { admin: false, owner: false });

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};
