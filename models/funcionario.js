const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cpf: { type: String, required: true, unique: true }, 
  age: { type: Number, required: true },
});

module.exports = mongoose.model('Employee', employeeSchema);