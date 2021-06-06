export default async (req, res) => {
  try {
    res.statusCode = 200;
    res.status(200).json({ messsage: "root api" });
  } catch (error) {
    res.status(400).json(error);
  }
};
