const express = require("express");
const { auth, authAdmin } = require("../middleware/auth");
const {
  signUp,
  login,
  getUser,
  getAdmin,
  logout,
} = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/user", auth, getUser);
router.get("/admin", auth, authAdmin, getAdmin);
router.post("/logout", auth, logout);

module.exports = router;