const Lead = require("../models/Lead");
const addLead = async(req , res) =>{
try{
    const dataToSave = new Lead(req.body);
    console.log(req.body)
    const response = await dataToSave.save();
    res.status(200).json({message : "Lead added successfully" , data : response})
}

catch(error){
    console.log(error)
     res.status(500).json({message : "Lead could not added"})
}
    
}

const readLead =  async (req , res) =>{
    try{
        const response  = await Lead.find();

        res.status(200).json({message :  "Lead Readed successfully" , data : response }) ; 
    }

    catch(error){
        console.log(error)
        res.status(500).json({message :  "Internal Server error"}) ; 
         
    }
}

const readLeadById = async (req , res)=>{

    try{
        const response = await Lead.findById(req.params.id);
        res.status(200).json({message : "Lead found successfully" , data : response})

    }
    catch(error){
        console.log(error)
        res.status(500).json({message :  "Inernal server error"})
    }

 }
 const updateLead = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await Lead.findByIdAndUpdate(
      id,
     {$set : req.body}, 
      { new: true,
        runValidators : true
       }
    );

    res.status(200).json({
      message: "Lead updated successfully",
      data: response
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to update lead",
      error: error.message
    });
  }
};

const deleteLead = async (req, res) => {

  try{

    const {id}  = req.params ; 
    
 const response  = await Lead.findByIdAndDelete(req.params.id);
    res.status(200).json({message : "Lead Deleted successfully" , data : response})    

  }

  catch(error){
    console.log(error)
   
    res.status(500).json({message : "Failed to delete lead"})    
  }
}
  const deleteMany = async (req , res) =>{
    try{

      const response = await Lead.deleteMany({_id  : {$in  : req.body.ids}});
      res.status(200).json({message : "Leads deleted successfully" , data : response})
    }

    catch(error){
      console.log(error)
      res.status(500).json({message : "Failed to delete leads"})
    }
} 

const searchLead = async(req , res) =>{
  try{
    const response  = await Lead.find({
      $or : [
        {businessName : {$regex : new RegExp(req.params.key , "i")}},
        {businessCategory : {$regex : new RegExp(req.params.key , "i")}},
        {city : {$regex : new RegExp(req.params.key , "i")}},
        {status : {$regex : new RegExp(req.params.key , "i")}},
        {assignedTeamMember : {$regex : new RegExp(req.params.key , "i")}}
           
      ]
    })

    if(!response){
    return res.status(404).json({message : "No leads found matching the search criteria"})
    }
    res.status(200).json({message : "Leads found successfully" , data : response})
  }

  catch(error){
    console.log(error)
    res.status(500).json({message : "Failed to search leads"})
  }

}
module.exports = {addLead , readLead , readLeadById ,updateLead ,deleteLead , deleteMany,searchLead} 