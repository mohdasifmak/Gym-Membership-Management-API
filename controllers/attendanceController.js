const Attendance = require('../models/Attendance');
const Subscription = require('../models/Subscription');

exports.checkIn = async (req, res) => {
  const activeSub = await Subscription.findOne({
    userId: req.user._id,
    status: 'active',
    startDate: { $lte: new Date() },
    endDate: { $gte: new Date() }
  });

  if (!activeSub) return res.status(400).json({ error: 'No active subscription' });

  const attendance = new Attendance({ userId: req.user._id });
  await attendance.save();
  res.status(201).json({ message: 'Check-in recorded' });
};

exports.todayAttendance = async (req, res) => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const data = await Attendance.find({ timestamp: { $gte: start, $lte: end } }).populate('userId', 'name email');
  res.json(data);
};

exports.userAttendanceHistory = async (req, res) => {
  const history = await Attendance.find({ userId: req.params.userId });
  res.json(history);
};

exports.attendanceSummary = async (req, res) => {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const count = await Attendance.countDocuments({
    userId: req.params.userId,
    timestamp: { $gte: startOfMonth }
  });

  res.json({ summary: `${count} visits this month` });
};
