const mongoose = require("mongoose");
const userRoutes = require("./routes/user_routes");
const cors = require("cors");
require("dotenv").config();


const dbconnection = require("./db/config");


const express = require("express") ;
const { leadRoutes } = require("./routes/leadRoutes");
// const { authRoutes } = require("./routes/authRoutes");

dbconnection();
const app = express();
app.use(cors()) ;
app.use(express.json());
app.use("/api", userRoutes);
app.use('/api/lead' , leadRoutes)
// app.use("/auth" , authRoutes)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});