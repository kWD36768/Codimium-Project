
const express = require('express') ;
const { registerUser, LoginUser } = require('../controllers/userController');

const userRoutes = express.Router() ; 

// userRoutes.js
userRoutes.post("/register", registerUser);

userRoutes.post("/login", LoginUser);




module.exports = userRoutes ;