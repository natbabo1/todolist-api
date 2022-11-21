module.exports = async (req, res, next) => {
  try {
    res.status(404).json({ message: "Resoure is not found" });
  } catch (err) {
    next(err);
  }
};
