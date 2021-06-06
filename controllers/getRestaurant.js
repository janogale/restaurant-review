import admin from "../lib/firebase-admin";

const db = admin.firestore();

export default async function getRestaurant(req, res) {
  const { resId } = req.query;

  // if there is no id reject call
  if (!resId) {
    return res.status(400).json({ error: "resturant id is required" });
  }

  try {
    const resDoc = db.collection("restaurants").doc(resId);

    const doc = await resDoc.get();

    if (doc.exists) {
      return res.status(200).json(doc.data());
    }
    return res.status(404).json({ error: "No data found" });
  } catch (error) {
    return res.status(401).json(error);
  }
}
