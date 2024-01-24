const Excersises = require("../models/excersises.models");

const getAllExcersises = async () => {
  return await Excersises.find();
};

const getExcersise = async (id) => {
  return await Excersises.findById(id);
};

const createExcersise = async (name, muscles, description, video, image) => {
  const newExcersise = new Excersises({
    name,
    muscles,
    description,
    video,
    image
  });

  return await newExcersise.save();
};

module.exports = { getAllExcersises, getExcersise, createExcersise };
