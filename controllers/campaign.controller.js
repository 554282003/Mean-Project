const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const { asyncHandler } = require("../utils/asyncHandler");
const { Campaign } = require("../model/Campaign.model");
const { Project } = require("../model/Project.model");

const deleteCampaign = asyncHandler(async (req, res) => {
  const campaignDeleteId = req.params.id;

  const project = await Campaign.findOne(
    { _id: campaignDeleteId },
    { allprojects: 1 }
  );

  if (!project) throw new ApiError(404, "No such campaign exists");

  try {
    project.allprojects.forEach(async (projectId) => {
      await Project.findByIdAndDelete({ _id: projectId });
    });
    await Campaign.findByIdAndDelete(campaignDeleteId);
    return res.status(200).json(new ApiResponse(200, "Successfully deleted"));
  } catch (error) {
    return resstatus(500).json(new ApiError(500, error));
  }
});

// const tp = asyncHandler(async(req,res)=>{
//   const {campid} = req.params.id;
//   const campproject = await Campaign.aggregate(
//     {
//       $match : {
//         "campid" : campid
//       }
//     },
//     {
//       $lookup : {
//         from : "projects",
//         localField : "allprojects",
//         foreignField : "_id",
//         as : "pro"
//       }
//     }
//   )
// })

module.exports = { deleteCampaign };
