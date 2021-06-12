/* eslint-disable import/no-unresolved */
// import controllers from root controllers folder.

import { addReply, deleteReply } from "controllers/";
import withAuth from "middlewares/withAuth";

export const config = {
  api: {
    externalResolver: true,
  },
};

const replyHandler = (req, res) => {
  // get http method
  const { method } = req;

  switch (method) {
    case "POST":
      addReply(req, res);
      break;
    case "DELETE":
      deleteReply(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withAuth(replyHandler);
