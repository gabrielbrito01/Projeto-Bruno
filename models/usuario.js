const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['employee', 'client'], required: true },

});

const User = mongoose.model('user', userSchema)
module.exports = User
