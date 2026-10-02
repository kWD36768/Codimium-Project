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
      req.body,
      { new: true }
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
module.exports = {addLead , readLead , readLeadById ,updateLead}