const express = require("express");
const { getAllExcersises, getExcersise, createExcersise, getRandomExcersises } = require("../controllers/excerciseController");

const router = express.Router();

router.get("/getExcersises", getAllExcersises);
router.get("/getExcersise/:id", getExcersise);
router.post("/createExcersise", createExcersise);
router.get("/getRandomExcersise/:n", getRandomExcersises)

module.exports = router;