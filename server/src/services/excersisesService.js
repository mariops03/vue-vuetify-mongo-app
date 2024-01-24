const Excersises = require("../models/excersises.models");

const getAllExcersises = async () => {
  return await Excersises.find();
};

const getExcersise = async (id) => {
  return await Excersises.findById(id);
};

const createExcersise = async (req, res, next) => {
  try {
    const { name, muscles, description, video, image } = req.body;
    const newExcersise = await excersisesService.createExcersise(
      name,
      muscles,
      description,
      video,
      image
    );

    const responseData = {
      name: newExcersise.name,
      muscles: newExcersise.muscles,
      description: newExcersise.description,
      video: newExcersise.video,
      image: newExcersise.image,
    };

    res.json(responseData);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllExcersises, getExcersise, createExcersise };
