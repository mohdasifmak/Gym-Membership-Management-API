const User = require('../models/User');
const Subscription = require('../models/Subscription');

exports.getAllUsers = async (req, res) => {
  const users = await User.find({}, '-password');
  res.json(users);
};

exports.getProfile = async (req, res) => {
  const user = await User.findById(req.params.id, '-password');
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
};

exports.updateProfile = async (req, res) => {
  const { name, email, phone } = req.body;
  const updated = await User.findByIdAndUpdate(req.params.id, { name, email, phone }, { new: true });
  res.json(updated);
};

exports.deleteUser = async (req, res) => {
  await Subscription.deleteMany({ userId: req.params.id });
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
};
