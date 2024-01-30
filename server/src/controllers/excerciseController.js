const excersisesService = require("../services/excersisesService");

const getAllExcersises = async (req, res) => {
  try {
    const excersises = await excersisesService.getAllExcersises();
    res.json(excersises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getExcersise = async (req, res) => {
  try {
    const { id } = req.params;
    const excersise = await excersisesService.getExcersise(id);
    if (excersise) {
      res.json(excersise);
    } else {
      res.status(404).json({ error: "Excersise not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRandomExcersises = async (req, res) => {
  try {
    const { n } = req.params;
    const excersises = await excersisesService.getRandomExcersises(n);
    res.json(excersises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getExcersiseByName = async (req, res) => {
  try {
    const { name } = req.params;
    const excersise = await excersisesService.getExcersiseByName(name);
    if (excersise) {
      res.json(excersise);
    } else {
      res.status(404).json({ error: "Excersise not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getExcersisesByForce = async (req, res) => {
  try {
    const { force } = req.params;
    const excersises = await excersisesService.getExcersisesByForce(force);
    res.json(excersises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getExcersisesByLevel = async (req, res) => {
  try {
    const { level } = req.params;
    const excersises = await excersisesService.getExcersisesByLevel(level);
    res.json(excersises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getExcersisesByMechanic = async (req, res) => {
  try {
    const { mechanic } = req.params;
    const excersises = await excersisesService.getExcersisesByMechanic(
      mechanic
    );
    res.json(excersises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getExcersisesByEquipment = async (req, res) => {
  try {
    const { equipment } = req.params;
    const excersises = await excersisesService.getExcersisesByEquipment(
      equipment
    );
    res.json(excersises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getExcersisesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const excersises = await excersisesService.getExcersisesByCategory(
      category
    );
    res.json(excersises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getExcersisesByPrimaryMuscle = async (req, res) => {
  try {
    const { primaryMuscle } = req.params;
    const excersises = await excersisesService.getExcersisesByPrimaryMuscle(
      primaryMuscle
    );
    res.json(excersises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getExcersisesBySecondaryMuscle = async (req, res) => {
  try {
    const { secondaryMuscle } = req.params;
    const excersises = await excersisesService.getExcersisesBySecondaryMuscle(
      secondaryMuscle
    );
    res.json(excersises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteExcersise = async (req, res) => {
  try {
    const { id } = req.params;
    const excersise = await excersisesService.deleteExcersise(id);
    if (excersise) {
      res.json(excersise);
    } else {
      res.status(404).json({ error: "Excersise not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createExcersise = async (req, res) => {
  try {
    const {
      name,
      force,
      level,
      mechanic,
      equipment,
      primaryMuscles,
      instructions,
      category,
      images,
      secondaryMuscles,
      id
    } = req.body;

    const exerciseData = {
      name,
      force,
      level,
      mechanic,
      equipment,
      primaryMuscles,
      instructions,
      category,
      images,
      secondaryMuscles
    };

    if (id) {
      exerciseData.id = id;
    } else {
      exerciseData.id = name.replace(/ /g, "_");
    }

    const newExercise = await excersisesService.createExcersise(exerciseData);

    res.status(200).json(newExercise);
  } catch (error) {
    console.error("Error creating exercise:", error);
    res.status(500).json({ message: "Internal server error" });
  }
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
  deleteExcersise,
};
