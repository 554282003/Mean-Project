const { Schema, model } = require("mongoose");

const campaignSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    allprojects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
  },
  { timestamps: true }
);

const Campaign = model("Campaign", campaignSchema);

module.exports = {Campaign};
