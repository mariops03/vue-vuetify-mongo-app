const express = require("express");
const {
  getAllExcersises,
  getExcersise,
  createExcersise,
  getRandomExcersises,
  getExcersiseByName,
  getExcersisesByCategory,
  getExcersisesByEquipment,
  getExcersisesByForce,
  getExcersisesByLevel,
  getExcersisesByMechanic,
  getExcersisesByPrimaryMuscle,
  getExcersisesBySecondaryMuscle,
} = require("../controllers/excerciseController");

const router = express.Router();

router.get("/getExcersises", getAllExcersises);
router.get("/getExcersise/:id", getExcersise);
router.post("/createExcersise", createExcersise);
router.get("/getRandomExcersise/:n", getRandomExcersises);
router.get("/getExcersiseByName/:name", getExcersiseByName);
router.get("/getExcersisesByForce/:force/", getExcersisesByForce);
router.get("/getExcersisesByLevel/:level", getExcersisesByLevel);
router.get("/getExcersisesByMechanic/:mechanic", getExcersisesByMechanic);
router.get("/getExcersisesByEquipment/:equipment", getExcersisesByEquipment);
router.get("/getExcersisesByCategory/:category", getExcersisesByCategory);
router.get(
  "/getExcersisesByPrimaryMuscle/:primaryMuscle",
  getExcersisesByPrimaryMuscle
);
router.get(
  "/getExcersisesBySecondaryMuscle/:secondaryMuscle",
  getExcersisesBySecondaryMuscle
);

module.exports = router;
