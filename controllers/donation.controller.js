const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const { asyncHandler } = require("../utils/asyncHandler");
const {Project} = require("../model/Project.model")
const {Campaign} = require("../model/Campaign.model")
const {Donation} = require("../model/Donation.model")

const donate = asyncHandler(async (req, res) => {

    const { projectId,amount } = req.body;
    if(!projectId){
      throw new ApiError(404,"project not found")
    }
    if(!amount){
      throw new ApiError(400,'Amount is required')
    }

    const project = await Project.findById(projectId)
    if (!project) {
        throw new ApiError(404,"Not Found")
      }

    const donationamount = await Donation.create({
        campaign_id : projectId.campaign_id,
        project_id : projectId,
        user_id : req.user._id,
        amount,
    })

    if(!donationamount){
        throw new ApiError(500,"Something went wrong")
    }
    console.log(project);
    project.current_amount += amount;
    await project.save()

    return res.status(200).json(new ApiResponse(200,"Payment successful"))

});

module.exports = {donate};
