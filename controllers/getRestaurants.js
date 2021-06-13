import admin from "../lib/firebase-admin";

const db = admin.firestore();

export default async function getRestaurants(req, res) {

const {isOwner, isAdmin, uid} = res?.locals

  try {
    let  colRef = db.collection("restaurants").orderBy("rating", "desc");

// if user is only owner, show his own restuarants
    if(isOwner && !isAdmin){
      colRef = db.collection("restaurants").where('ownerId', '==', uid).orderBy("rating", "desc")
    }
    
    const snapShot = await colRef.get();

    // return data with ID
    const data = snapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return res.status(200).json(data);
  } catch (error) {
    return res.status(401).json(error);
  }
}
