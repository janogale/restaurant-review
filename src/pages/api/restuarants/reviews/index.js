/* eslint-disable import/no-unresolved */

// import controllers from root controllers folder.
import { createReview, deleteReview, updateReview } from "controllers/";
import withAuth from "middlewares/withAuth";

export const config = {
  api: {
    externalResolver: true,
  },
};

const reviewHandler = (req, res) => {
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

export default withAuth(reviewHandler);
