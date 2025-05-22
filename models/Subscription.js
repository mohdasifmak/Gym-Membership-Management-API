const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan' },
  startDate: Date,
  endDate: Date,
  status: { type: String, default: 'active' },
  freeze: { start: Date, end: Date }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
