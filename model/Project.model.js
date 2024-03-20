const { Schema, model } = require("mongoose");

const projectSchema = Schema(
  {
    campaign_id: {
      type: Schema.Types.ObjectId,
      ref: "Campaign", //refer to the model
    },
    campaign_name: {
      type: String,
      required: true,
    },
    project_title: {
      type: String,
      required: true,
    },
    project_image: {
      type: String,
    },
    project_description: {
      type: String,
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    goal_amount: {
      type: String,
      required: true,
      default: 0,
    },
    current_amount:{
      type : Number,
      default : 0,
  },
    status: {
      type: String,
      enum: ["InProgress", "Completed"],
      default: "InProgress",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User", //refers
    },
  },
  { timestamps: true }
);

const Project = model("Project", projectSchema);

module.exports = { Project };
