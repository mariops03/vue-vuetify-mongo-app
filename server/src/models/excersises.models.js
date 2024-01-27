const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  force: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  mechanic: {
    type: String
  },
  equipment: {
    type: String,
    required: true
  },
  primaryMuscles: {
    type: [String],
    required: true
  },
  secondaryMuscles: {
    type: [String]
  },
  instructions: {
    type: [String],
    required: true
  },
  category: {
    type: String,
    required: true
  },
  images: {
    type: [String]
  },
  id: {
    type: String,
    required: true,
    unique: true
  }
});

const Exercise = mongoose.model('ejercicios', exerciseSchema);

module.exports = Exercise;
