import admin from "../lib/firebase-admin";

const db = admin.firestore();

export default async function addReplyToReview(req, res) {
  const { reply, createdAt, restuarantId, author, ui, reviewId } = req.body;

  // if there is no id reject call
  if (!restuarantId || !reviewId) {
    return res
      .status(400)
      .json({ error: "resturant id and author id is required" });
  }

  try {
    // get restaurant doc
    const reviewDocRef = db
      .collection("restaurants")
      .doc(restuarantId)
      .collection("reviews")
      .doc(reviewId);

    // add reply
    const docRef = await reviewDocRef.update({
      isReplied: true,
      reply: {
        reply,
        author,
        ui,
        createdAt,
      },
    });

    return res.status(201).json(docRef.id);
  } catch (error) {
    return res.status(401).json(error);
  }
}
