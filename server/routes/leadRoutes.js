const express = require("express");
const { addLead, readLead, readLeadById, updateLead, deleteLead, deleteMany, searchLead } = require("../controllers/leadController");
const leadRoutes = express.Router() ;

leadRoutes.post('/addLead' , addLead)  

leadRoutes.get('/readLead' , readLead)   

leadRoutes.get("/readLeadById/:id",readLeadById);

leadRoutes.put("/updateLead/:id", updateLead);

leadRoutes.delete("/deleteLead/:id", deleteLead);

leadRoutes.delete("/deleteMany", deleteMany)   

leadRoutes.get("/searchLead/:key", searchLead)    










module.exports = {leadRoutes}