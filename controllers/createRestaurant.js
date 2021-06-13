import admin from "../lib/firebase-admin";

const db = admin.firestore();

async function createRestaurant(req, res) {
  const {
    name,
    ownerId,
    description,
    contact = "",
    address = "",
    createdAt,
    city = "",
  } = req.body;


  // if there is no id reject call
  if (!ownerId || !name) {
    return res
      .status(400)
      .json({ error: "resturant name and owner id are required" });
  }

  try {
    const colRef = db.collection("restaurants");

    const docRef = await colRef.add({
      name,
      description,
      contact,
      createdAt,
      city,
      address,
      ownerId,
    });

    // add custom claims - make user owner
    await admin
      .auth()
      .setCustomUserClaims(ownerId, {  owner: true });

    return res
      .status(201)
      .json({ message: "Created successfully", id: docRef.id });
  } catch (error) {
    return res.status(401).json({ message: "error occured" });
  }
}

export default createRestaurant;
