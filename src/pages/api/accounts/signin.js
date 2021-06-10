// eslint-disable-next-line import/no-unresolved
import firebase from "@/lib/firebase";

export default async (req, res) => {
  const { password, email } = req.body;
  try {
    const user = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    res.statusCode = 200;
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};
