const express = require("express");

const {
  registerUser,
  LoginUser,
  getTeamMembers
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const userRoutes = express.Router();

userRoutes.post("/register", registerUser);

userRoutes.post("/login", LoginUser);

userRoutes.get(
  "/team-members",
  authMiddleware,
  adminMiddleware,
  getTeamMembers
);

module.exports = userRoutes;