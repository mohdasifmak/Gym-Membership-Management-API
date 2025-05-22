const User = require('../models/User');
const Subscription = require('../models/Subscription');
const Attendance = require('../models/Attendance');
const Payment = require('../models/Payment');
const Plan = require('../models/Plan');

exports.getStats = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const activeSubscriptions = await Subscription.countDocuments({ status: 'active' });

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const checkInsToday = await Attendance.countDocuments({
    timestamp: { $gte: today, $lt: tomorrow }
  });

  const totalRevenue = await Payment.aggregate([
    { $group: { _id: null, total: { $sum: '$amount' } } }
  ]);

  const popularPlan = await Subscription.aggregate([
    { $group: { _id: '$planId', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 1 }
  ]);

  let planDetails = null;
  if (popularPlan.length) {
    planDetails = await Plan.findById(popularPlan[0]._id);
  }

  res.json({
    totalUsers,
    activeSubscriptions,
    checkInsToday,
    totalRevenue: totalRevenue[0]?.total || 0,
    mostPopularPlan: planDetails?.name || 'N/A'
  });
};
