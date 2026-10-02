const express = require("express");
const { addLead, readLead, readLeadById, updateLead } = require("../controllers/leadController");
const leadRoutes = express.Router() ;

leadRoutes.post('/addLead' , addLead)  

leadRoutes.get('/readLead' , readLead)   

leadRoutes.get("/readLeadById/:id",readLeadById);

leadRoutes.put("/updateLead/:id", updateLead);



module.exports = {leadRoutes}