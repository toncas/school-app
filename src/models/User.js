const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  authId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auth',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    enum: ['teacher', 'student'],
    required: true
  },
  additionalData: {
    // You can define properties specific to teachers or students here
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);