const express = require("express");
const { getAllExcersises, getExcersise, createExcersise } = require("../controllers/excerciseController");

const router = express.Router();

router.get("/getExcersises", getAllExcersises);
router.get("/getExcersise/:id", getExcersise);
router.post("/createExcersise", createExcersise);

module.exports = router;