const getUser = (req, res) => {
  res.status(200).json({ message: 'User found', user: req.user });
};

module.exports = {
  getUser,
};
