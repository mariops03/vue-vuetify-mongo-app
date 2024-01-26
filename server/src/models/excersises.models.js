const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  muscles: {
    type: [String],  
    required: true
  },
  description: {
    type: String,
    required: true
  },
  video: {
    type: String
  },
  image: {
    type: String  
  }
});

const Exercise = mongoose.model('ejercicios', exerciseSchema);

module.exports = Exercise;
