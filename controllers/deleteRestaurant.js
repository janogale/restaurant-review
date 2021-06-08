import admin from "../lib/firebase-admin";

const db = admin.firestore();

export default async function deleRetuarant(req, res) {
  const { restuarantId } = req.query;

  // if there is no id reject call
  if (!restuarantId) {
    return res.status(400).json({ error: "resturant id is required" });
  }

  try {
    // first delete reviews before deleting restuarant

    db.collection("restaurants")
      .doc(restuarantId)
      .collection("reviews")
      .listDocuments()
      .then((val) => {
        val.map((doc) => doc.delete());
      });

    // Delete restuarant then.

    const response = await db
      .collection("restaurants")
      .doc(restuarantId)
      .delete();

    if (response) {
      // return doc with id
      return res.status(200).json(response);
    }
    return res.status(404).json({ error: "No data found" });
  } catch (error) {
    return res.status(401).json({ error });
  }
}
