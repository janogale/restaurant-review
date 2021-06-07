// import controllers from root controllers folder.

// eslint-disable-next-line import/no-unresolved
import { createReview, deleteReview, updateReview } from "controllers/";

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
      createReview(req, res);
      break;
    case "DELETE":
      deleteReview(req, res);
      break;
    case "PUT":
      updateReview(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
