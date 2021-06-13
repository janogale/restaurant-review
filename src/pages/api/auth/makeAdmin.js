/* eslint-disable import/no-unresolved */
import admin from "@/lib/firebase-admin";


export default async (req, res) => {
  const { email } = req.body;
  try {
    const userRecord = await admin.auth().getUserByEmail(email)

 const {uid } = userRecord.toJSON()
 
 // // make admin
await admin
 .auth()
 .setCustomUserClaims(uid, { admin: true, owner: true });
 


    res.status(200).json(userRecord.toJSON());
  } catch (error) {
    res.status(400).json(error);
  }
};
