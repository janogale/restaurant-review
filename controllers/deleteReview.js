import admin from "../lib/firebase-admin";

const db = admin.firestore();

export default async function deleteReview(req, res) {
  const { restuarantId, reviewId, rating } = req.body;

  // if there is no reviewId and restuarantId, reject call
  if (!restuarantId || !reviewId) {
    return res
      .status(400)
      .json({ error: "resturantId and reviewId are required" });
  }

  try {
    // get restaurant doc
    const resDocRef = db.collection("restaurants").doc(restuarantId);

    // decrement rating
    await resDocRef.update({
      rating: admin.firestore.FieldValue.increment(-rating),
    });

    // decrement rating
    await resDocRef.update({
      ratingCount: admin.firestore.FieldValue.increment(-1),
    });

    const response = await resDocRef
      .collection("reviews")
      .doc(reviewId)
      .delete();

    if (response) {
      // return doc with id
      return res.status(200).json({ message: "successfully deleted review" });
    }
    return res.status(404).json({ error: "No data found" });
  } catch (error) {
    return res.status(401).json({ error });
  }
}
