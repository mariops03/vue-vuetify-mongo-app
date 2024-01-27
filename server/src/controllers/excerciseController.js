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
        const { name, force, level, mechanic, equipment, primaryMuscles, secondaryMuscles, instructions, category, images } = req.body;
        const newExcersise = await excersisesService.createExcersise(name, force, level, mechanic, equipment, primaryMuscles, secondaryMuscles, instructions, category, images);

        const responseData = {
            name: newExcersise.name,
            force: newExcersise.force,
            level: newExcersise.level,
            mechanic: newExcersise.mechanic,
            equipment: newExcersise.equipment,
            primaryMuscles: newExcersise.primaryMuscles,
            secondaryMuscles: newExcersise.secondaryMuscles,
            instructions: newExcersise.instructions,
            category: newExcersise.category,
            images: newExcersise.images,
            id: newExcersise.id
        };

        res.status(201).json(responseData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getAllExcersises, getExcersise, createExcersise };
