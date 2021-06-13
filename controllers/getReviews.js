import admin from "../lib/firebase-admin";

const db = admin.firestore();

export default async function getReviews(req, res) {
  const { restuarantId } = req.query;
  try {
    const colRef = db
      .collection("restaurants")
      .doc(restuarantId)
      .collection("reviews").orderBy("createdAt", "desc");
    const snapShot = await colRef.get();

    // return data with ID
    const data = snapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return res.status(200).json(data);
  } catch (error) {
    return res.status(401).json(error);
  }
}
