import admin from "../lib/firebase-admin";

const withAuth = (handler) => async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).send({ message: "Unauthorized" });

  if (!authorization.startsWith("Bearer"))
    return res.status(401).send({ message: "Unauthorized" });

  const split = authorization.split("Bearer ");
  if (split.length !== 2)
    return res.status(401).send({ message: "Unauthorized" });

  const token = split[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);


    res.locals = {
      ...res.locals,
      uid: decodedToken.uid,
      email: decodedToken.email,
      isOwner: decodedToken?.owner || false,
      isAdmin: decodedToken?.admin || false,
    };
    return handler(req, res);
  } catch (err) {
    return res.status(401).send({ message: "Unauthorized" });
  }
};

export default withAuth;
