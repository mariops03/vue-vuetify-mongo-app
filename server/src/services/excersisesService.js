const Excersises = require('../models/excersises.models');

const getAllExcersises = async () => {
  return await Excersises.find();
};

const getExcersise = async (id) => {
  return await Excersises.findById(id);
};

const getRandomExcersises = async (n) => {
  return await Excersises.aggregate([{ $sample: { size: parseInt(n) } }]);
};

const createExcersise = async (name, force, level, mechanic, equipment, primaryMuscles, secondaryMuscles, instructions, category, images) => {
  const id = name.replace(/ /g, '_');
  const newExcersise = new Excersises({
    name,
    force,
    level,
    mechanic,
    equipment,
    primaryMuscles,
    secondaryMuscles,
    instructions,
    category,
    images,
    id
  });

  return await newExcersise.save();
};

module.exports = { getAllExcersises, getExcersise, createExcersise, getRandomExcersises };
