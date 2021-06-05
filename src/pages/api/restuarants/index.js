// import controllers from root controllers folder.
import { createRestaurant, getRestaurants } from "controllers";

export default (req, res) => {
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
