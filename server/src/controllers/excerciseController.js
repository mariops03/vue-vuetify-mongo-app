const excersisesService = require('../services/excersisesService');

const getAllExcersises = async (req, res) => {
    try {
        const excersises = await excersisesService.getAllExcersises();
        res.json(excersises);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getExcersise = async (req, res) => {
    try {
        const { id } = req.params;
        const excersise = await excersisesService.getExcersise(id);
        if (excersise) {
            res.json(excersise);
        } else {
            res.status(404).json({ error: 'Excersise not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createExcersise = async (req, res) => {
    try {
        const { name, muscles, description, video, image } = req.body;
        const newExcersise = await excersisesService.createExcersise(name, muscles, description, video, image);

        const responseData = {
            name: newExcersise.name,
            muscles: newExcersise.muscles,
            description: newExcersise.description,
            video: newExcersise.video,
            image: newExcersise.image,
        };

        res.status(201).json(responseData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getAllExcersises, getExcersise, createExcersise };
