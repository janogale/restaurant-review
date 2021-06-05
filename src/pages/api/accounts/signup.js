import firebase from "../../../../lib/firebase";

export default async (req, res) => {
  const { password, email } = req.body;
  try {
    if (firebase) {
      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      res.statusCode = 200;
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
