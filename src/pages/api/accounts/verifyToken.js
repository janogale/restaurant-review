// eslint-disable-next-line import/no-unresolved
import admin from "@/lib/firebase-admin";

// eslint-disable-next-line consistent-return
export default async (req, res) => {
  const { token } = req.body;
  try {
    const claims = await admin.auth().verifyIdToken(token);

    res.status(200).json(claims);
  } catch (error) {
    res.status(400).json(error);
  }
};
