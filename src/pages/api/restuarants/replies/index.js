// import controllers from root controllers folder.

// eslint-disable-next-line import/no-unresolved
import { addReply } from "controllers/";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default (req, res) => {
  // get http method
  const { method } = req;

  switch (method) {
    case "POST":
      addReply(req, res);
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
