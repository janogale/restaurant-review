import admin from "../lib/firebase-admin";

const db = admin.firestore();

export default async function createRestaurant(req, res) {
  const { comment, restuarantId, authorId, author, rating, createdAt } =
    req.body;

  // if there is no id reject call
  if (!restuarantId || !authorId) {
    return res
      .status(400)
      .json({ error: "resturant id and author id is required" });
  }

  // data is empty
  if (!comment) {
    return res.status(400).json({ error: "Please provide comment and rating" });
  }

  try {
    // get restaurant doc
    const resDocRef = db.collection("restaurants").doc(restuarantId);

    // increment total rating
    await resDocRef.update({
      rating: admin.firestore.FieldValue.increment(rating),
    });

    // increment rating count - how many users rated
    await resDocRef.update({
      ratingCount: admin.firestore.FieldValue.increment(1),
    });
    // store new review
    const colRef = resDocRef.collection("reviews");

    const docRef = await colRef.add({
      comment,
      restuarantId,
      authorId,
      rating,
      createdAt,
      author,
    });

    return res.status(201).json(docRef.id);
  } catch (error) {
    return res.status(401).json(error);
  }
}
