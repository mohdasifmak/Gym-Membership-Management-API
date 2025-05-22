const Plan = require('../models/Plan');

exports.getPlans = async (req, res) => {
  const plans = await Plan.find();
  res.json(plans);
};

exports.addPlan = async (req, res) => {
  const plan = new Plan(req.body);
  await plan.save();
  res.status(201).json(plan);
};

exports.updatePlan = async (req, res) => {
  const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(plan);
};

exports.deletePlan = async (req, res) => {
  await Plan.findByIdAndDelete(req.params.id);
  res.json({ message: 'Plan deleted' });
};
