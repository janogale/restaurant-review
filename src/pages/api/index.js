// eslint-disable-next-line import/no-unresolved
import withAuth from "middlewares/withAuth";

const rootHandler = async (req, res) => {
  try {
    res.statusCode = 200;
    res.status(200).json({ messsage: "root api" });
  } catch (error) {
    res.status(400).json(error);
  }
};

export default withAuth(rootHandler);
