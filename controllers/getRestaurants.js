import admin from "../lib/firebase-admin";

const db = admin.firestore();

export default async function createRestaurant(req, res) {
  try {
    const colRef = db.collection("restaurants");
    const snapShot = await colRef.get();

    // return data with ID
    const data = snapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return res.status(200).json(data);
  } catch (error) {
    return res.status(401).json(error);
  }
}
