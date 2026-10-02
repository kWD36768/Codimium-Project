
const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      required: true,
      trim: true
    },

    contactPerson: {
      type: String,
      trim: true
    },

    phone: {
      type: String,
      trim: true
    },

    email: {
      type: String,
      trim: true
    },

    city: {
      type: String,
      trim: true
    },

    businessCategory: {
      type: String,
      trim: true
    },

    websiteUrl: {     
      type: String,
      trim: true        
    },

    socialMediaUrl: {
      type: String,
      trim: true
    },

    potentialService: {
      type: String,
      enum: [
        "Website",
        "Shopify",
        "SEO",
        "Automation",
        "Other"
      ]
    },

    status: {
      type: String,
      enum: [
        "New",
        "Contacted",
        "Interested",
        "Meeting",
        "Proposal Sent",
        "Won",
        "Lost"
      ],
      default: "New"
    },


    notes: {
      type: String
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
   

    followUpDate: {
      type: Date
    }
  },

  {
    timestamps: true
  }
);

module.exports = mongoose.model("Lead", leadSchema);