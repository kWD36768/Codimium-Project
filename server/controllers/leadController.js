const Lead = require("../models/Lead");
const User = require("../models/User");
const addLead = async (req, res) => {
  try {
    const dataToSave = { ...req.body };

    if (req.user.role !== "admin") {
      dataToSave.assignedTo = req.user.userId;

    }

    if (req.user.role === "admin") {
      const assignedUser = await User.findById(
        dataToSave.assignedTo
      ).select("role");

      if (!assignedUser || assignedUser.role !== "team member") {
        return res.status(400).json({
          message: "Please select a valid Team Member"
        });
      }
    }

    delete dataToSave.assignedTeamMember;

    const response = await new Lead(dataToSave).save();

    return res.status(201).json({
      message: "Lead added successfully",
      data: response
    });

  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: "Lead could not be added",
      error: error.message
    });
  }
};

const readLead = async (req, res) => {
  try {
    let filter = {};

    if (req.user.role !== "admin") {
      filter.assignedTo = req.user.userId;
    }

    const response = await Lead.find(filter)
      .populate("assignedTo", "name email");

    res.status(200).json({
      message: "Leads read successfully",
      data: response
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to read leads"
    });
  }
};

const readLeadById = async (req, res) => {
  try {
    const response = await Lead.findById(req.params.id)
      .populate("assignedTo", "name email");

    if (!response) {
      return res.status(404).json({
        message: "Lead not found"
      });
    }

    let assignedId = response.assignedTo;

    if (assignedId && typeof assignedId === "object") {
      assignedId = assignedId._id;
    }

    if (
      req.user.role !== "admin" &&
      String(assignedId) !== String(req.user.userId)
    ) {
      return res.status(403).json({
        message: "You cannot access this lead"
      });
    }

    return res.status(200).json({
      message: "Lead found successfully",
      data: response
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to read lead"
    });
  }
};
const updateLead = async (req, res) => {
  try {

    
    const { id } = req.params;

    const lead = await Lead.findById(id);

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found"
      });
    }

    if (
      req.user.role !== "admin" &&
      String(lead.assignedTo) !== String(req.user.userId)
    ) {
      return res.status(403).json({
        message: "You cannot update this lead"
      });
    }

    const updateData = { ...req.body };

    delete updateData._id;
    delete updateData.__v;
    delete updateData.createdAt;
    delete updateData.updatedAt;
    delete updateData.assignedTeamMember;

    if (req.user.role !== "admin") {
      delete updateData.assignedTo;
    }

    if (req.user.role === "admin" && updateData.assignedTo) {
      const assignedUser = await User.findById(
        updateData.assignedTo
      ).select("role");

      if (!assignedUser || assignedUser.role !== "team member") {
        return res.status(400).json({
          message: "Please select a valid Team Member"
        });
      }
    }

    const response = await Lead.findByIdAndUpdate(
      id,
      { $set: updateData },
      {
        returnDocument: "after",
        runValidators: true
      }
    );

    return res.status(200).json({
      message: "Lead updated successfully",
      data: response
    });

  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: "Failed to update lead",
      error: error.message
    });
  }
};

const deleteLead = async (req, res) => {
  try {
    const { id } = req.params;

    const lead = await Lead.findById(id);

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found"
      });
    }

    if (
      req.user.role !== "admin" &&
      String(lead.assignedTo) !== String(req.user.userId)
    ) {
      return res.status(403).json({
        message: "You cannot delete this lead"
      });
    }

    const response = await Lead.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Lead deleted successfully",
      data: response
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to delete lead"
    });
  }
};
const deleteMany = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        message: "Please select leads to delete"
      });
    }

    const selectedLeads = await Lead.find({
      _id: { $in: ids }
    }).select("_id assignedTo");

    if (
      req.user.role !== "admin" &&
      selectedLeads.some(
        (lead) =>
          String(lead.assignedTo) !== String(req.user.userId)
      )
    ) {
      return res.status(403).json({
        message: "You cannot delete leads assigned to another member"
      });
    }

    const response = await Lead.deleteMany({
      _id: { $in: ids }
    });

    return res.status(200).json({
      message: "Selected leads deleted successfully",
      data: response
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to delete selected leads"
    });
  }
}; 

const searchLead = async (req, res) => {
  try {
    const key = req.params.key;

    const matchingUsers = await User.find({
      role: "team member",
      name: { $regex: key, $options: "i" }
    }).select("_id");

    const filter = {
      $or: [
        { businessName: { $regex: key, $options: "i" } },
        { businessCategory: { $regex: key, $options: "i" } },
        { city: { $regex: key, $options: "i" } },
        { status: { $regex: key, $options: "i" } },
        { potentialService: { $regex: key, $options: "i" } },
        {
          assignedTo: {
            $in: matchingUsers.map((user) => user._id)
          }
        }
      ]
    };

    // Team Member ko sirf apni assigned leads milengi
    if (req.user.role !== "admin") {
      filter.assignedTo = req.user.userId;
    }

    const response = await Lead.find(filter)
      .populate("assignedTo", "name email");

    return res.status(200).json({
      message: "Search completed",
      data: response
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to search leads"
    });
  }
};


module.exports = {addLead , readLead , readLeadById ,updateLead ,deleteLead , deleteMany,searchLead} 