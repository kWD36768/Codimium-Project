const express = require("express");
const { addLead, readLead, readLeadById, updateLead, deleteLead, deleteMany, searchLead } = require("../controllers/leadController");
const authMiddleware = require("../middleware/authMiddleware");
const leadRoutes = express.Router() ;


leadRoutes.post("/addLead", authMiddleware, addLead);

leadRoutes.get('/readLead',authMiddleware , readLead)   

leadRoutes.get("/readLeadById/:id",authMiddleware, readLeadById);

leadRoutes.put("/updateLead/:id", authMiddleware, updateLead);

leadRoutes.delete("/deleteLead/:id", authMiddleware, deleteLead);

leadRoutes.delete("/deleteMany", authMiddleware, deleteMany)   

leadRoutes.get("/searchLead/:key", authMiddleware, searchLead)    










module.exports = {leadRoutes}