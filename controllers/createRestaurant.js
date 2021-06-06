import { uid } from "uid";
import admin from "../lib/firebase-admin";

const db = admin.firestore();

export default async function createRestaurant(req, res) {
  const { name, description, contact, createdAt } = req.body;

  try {
    const colRef = db.collection("restaurants");

    const docRef = await colRef.add({
      name,
      description,
      contact,
      createdAt,
      id: uid(),
    });

    return res
      .status(201)
      .json({ message: "Created successfully", id: docRef.id });
  } catch (error) {
    return res.status(401).json(error);
  }
}
