export default function getRestaurants(req, res) {
  const { name, description, contact } = req.body;

  res.status(200).json({ name, description, contact });
}
