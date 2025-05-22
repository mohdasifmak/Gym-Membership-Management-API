const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  name: String,
  duration: Number, // days
  price: Number,
  accessType: String
});

module.exports = mongoose.model('Plan', planSchema);
