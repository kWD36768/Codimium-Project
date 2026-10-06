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
      trim: true,
      required: true
    },

    phone: {
      type: String,
      trim: true,
      required: true

    },

    email: {
      type: String,
      trim: true,
      required: true
    },

    city: {
      type: String,
      trim: true,
      required: true
    },

    businessCategory: {
      type: String,
      trim: true,
      required: true
    },

    websiteUrl: {
      type: String,
      trim: true,
      required: true
    },

    socialMediaUrl: {
      type: String,
      trim: true,
      required: true
    },

    potentialService: {
      type: String,
      enum: [
        "Website",
        "Shopify",
        "SEO",
        "Automation",
        "Other"
      ],
      required: true
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
      default: "New",
      required: true
    },

    notes: {
      type: String,
      required: true
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    assignedTeamMember: {
      type: String,
      default: "",
      required: true
    },

    followUpDate: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Lead", leadSchema);