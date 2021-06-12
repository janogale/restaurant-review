import admin from "../lib/firebase-admin";

// authentication middleware
import withAuth from "../middlewares/withAuth";

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

  console.log(req.body);
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

    return res
      .status(201)
      .json({ message: "Created successfully", id: docRef.id });
  } catch (error) {
    return res.status(401).json({ message: "error occured" });
  }
}

export default withAuth(createRestaurant);
