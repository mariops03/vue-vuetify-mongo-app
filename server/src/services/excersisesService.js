const Excersises = require("../models/excersises.models");

const getAllExcersises = async () => {
  return await Excersises.find();
};

const getExcersise = async (id) => {
  return await Excersises.findById(id);
};

const getRandomExcersises = async (n) => {
  return await Excersises.aggregate([{ $sample: { size: parseInt(n) } }]);
};

const getExcersiseByName = async (name) => {
  return await Excersises.find({ name: { $regex: name, $options: "i" } });
};

const getExcersisesByForce = async (force) => {
  return await Excersises.find({ force: { $regex: force, $options: "i" } });
};

const getExcersisesByLevel = async (level) => {
  return await Excersises.find({ level: { $regex: level, $options: "i" } });
};

const getExcersisesByMechanic = async (mechanic) => {
  return await Excersises.find({
    mechanic: { $regex: mechanic, $options: "i" },
  });
};

const getExcersisesByEquipment = async (equipment) => {
  return await Excersises.find({
    equipment: { $regex: equipment, $options: "i" },
  });
};

const getExcersisesByCategory = async (category) => {
  return await Excersises.find({
    category: { $regex: category, $options: "i" },
  });
};

const getExcersisesByPrimaryMuscle = async (primaryMuscle) => {
  return await Excersises.find({
    primaryMuscles: { $regex: primaryMuscle, $options: "i" },
  });
};

const getExcersisesBySecondaryMuscle = async (secondaryMuscle) => {
  return await Excersises.find({
    secondaryMuscles: { $regex: secondaryMuscle, $options: "i" },
  });
};

const deleteExcersise = async (id) => {
  return await Excersises.findOneAndDelete({ id: id });
}

const createExcersise = async (exerciseData) => {
  const newExercise = new Excersises(exerciseData);
  return await newExercise.save();
};

module.exports = {
  getAllExcersises,
  getExcersise,
  createExcersise,
  getRandomExcersises,
  getExcersiseByName,
  getExcersisesByForce,
  getExcersisesByLevel,
  getExcersisesByMechanic,
  getExcersisesByEquipment,
  getExcersisesByCategory,
  getExcersisesByPrimaryMuscle,
  getExcersisesBySecondaryMuscle,
  deleteExcersise
};
