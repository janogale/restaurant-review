export default function createRestaurant(req, res) {
  const { name, description, contact } = req.body;

  res.status(200).json({ name, description, contact });
}
