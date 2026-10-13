const express = require("express");
const router = express.Router();

const {
  renderRegisterForm,
  registerUser,
  renderLoginForm,
  loginUser,
  logoutUser,
} = require("../controllers/user");

const { saveRedirectUrl } = require("../middlewares/middleware");

// Register
router.get("/register", renderRegisterForm);
router.post("/register", registerUser);

// Login
router.get("/login", renderLoginForm);
router.post("/login", saveRedirectUrl, loginUser);

// Logout
router.get("/logout", logoutUser);

module.exports = router;