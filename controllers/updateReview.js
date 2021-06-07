import admin from "../lib/firebase-admin";

const db = admin.firestore();

export default async function createRestaurant(req, res) {
  const { restuarantId, reviewId, comment, rating } = req.body;

  // if there is no id reject call
  if (!restuarantId || !reviewId) {
    return res
      .status(400)
      .json({ error: "resturantid and reviewId are required" });
  }

  try {
    const colRef = db
      .collection("restaurants")
      .doc(restuarantId)
      .collection("reviews")
      .doc(reviewId);

    const docRef = await colRef.set({
      comment,
      restuarantId,
      rating,
    });

    return res.status(201).json(docRef.id);
  } catch (error) {
    return res.status(401).json(error);
  }
}
