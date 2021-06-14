/* eslint-disable import/no-unresolved */
import admin from "@/lib/firebase-admin";


export default async (req, res) => {

  const { method } = req;

  if (method !== 'GET') return res.status(401).send({ message: "Method not allowed" });

  try {
    const listUsersResult = await admin.auth().listUsers(20)

    let users = listUsersResult.users.reduce((acc, userRecord) => {
      const { email, uid, customClaims, metadata } = userRecord.toJSON()
      acc.push({ email, uid, customClaims, ...metadata })

      return acc;
    }, []);

    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error);
  }
};
