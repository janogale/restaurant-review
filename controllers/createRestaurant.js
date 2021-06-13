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

    // get users custom claims
    const userRecord = await admin.auth().getUser(ownerId);

    const isAdmin = userRecord.customClaims['admin']
    console.log(isAdmin)
    // add custom claims - make user owner
    await admin
          .auth()
          .setCustomUserClaims(ownerId, { owner: true, admin: isAdmin || false });

          
    return res
      .status(201)
      .json({ message: "Created successfully", id: docRef.id });
  } catch (error) {
    return res.status(401).json({ message: "error occured" });
  }
}

export default createRestaurant;
