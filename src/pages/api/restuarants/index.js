/* eslint-disable import/no-unresolved */

// import controllers from root controllers folder.
import { createRestaurant, getRestaurants } from "controllers/";

// authentication middleware
import withAuth from "middlewares/withAuth";

// authorization middleware
import isAuthorized from "middlewares/isAuthorized";


export const config = {
  api: {
    externalResolver: true,
  },
};

const handler = (req, res) => {

 // get http method
  const { method } = req;

  switch (method) {
    case "GET":
      getRestaurants(req, res);
      break;
    case "POST":
      createRestaurant(req, res);

      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withAuth(isAuthorized(handler));
