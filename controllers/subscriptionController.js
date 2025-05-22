const Subscription = require('../models/Subscription');
const Plan = require('../models/Plan');

exports.subscribeToPlan = async (req, res) => {
  const { planId } = req.body;
  const plan = await Plan.findById(planId);
  if (!plan) return res.status(404).json({ error: 'Plan not found' });

  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(startDate.getDate() + plan.duration);

  const subscription = new Subscription({
    userId: req.user._id,
    planId,
    startDate,
    endDate
  });

  await subscription.save();
  res.status(201).json(subscription);
};

exports.getSubscriptions = async (req, res) => {
  const subscriptions = await Subscription.find({ userId: req.user._id }).populate('planId');
  res.json(subscriptions);
};

exports.cancelSubscription = async (req, res) => {
  await Subscription.findByIdAndUpdate(req.params.id, { status: 'cancelled' });
  res.json({ message: 'Subscription cancelled' });
};

exports.freezeSubscription = async (req, res) => {
  const { start, end } = req.body;
  const sub = await Subscription.findById(req.params.id);
  if (!sub) return res.status(404).json({ error: 'Subscription not found' });

  const duration = (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24);
  sub.endDate.setDate(sub.endDate.getDate() + duration);
  sub.freeze = { start, end };
  sub.status = 'frozen';
  await sub.save();

  res.json({ message: 'Subscription frozen', sub });
};
