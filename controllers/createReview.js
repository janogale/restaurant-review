import admin from "../lib/firebase-admin";

const db = admin.firestore();

export default async function createRestaurant(req, res) {
  const { comment, restuarantId, authorId, rating } = req.body;

  // if there is no id reject call
  if (!restuarantId || !authorId) {
    return res
      .status(400)
      .json({ error: "resturant id and author id is required" });
  }

  // data is empty
  if (!comment || !rating) {
    return res.status(400).json({ error: "Please provide comment and rating" });
  }

  try {
    const colRef = db
      .collection("restaurants")
      .doc(restuarantId)
      .collection("reviews");

    const docRef = await colRef.add({
      comment,
      restuarantId,
      authorId,
      rating,
    });

    return res.status(201).json(docRef.id);
  } catch (error) {
    return res.status(401).json(error);
  }
}
