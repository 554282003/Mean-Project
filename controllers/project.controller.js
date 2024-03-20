const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const { asyncHandler } = require("../utils/asyncHandler");
const { Project } = require("../model/Project.model");
const { Campaign } = require("../model/Campaign.model");

const createProject = asyncHandler(async (req, res) => {
  const {
    campaignName,
    title,
    image,
    description,
    startdate,
    enddate,
    goalamount,
    status,
  } = req.body;
  if (
    !(
      campaignName ||
      title ||
      image ||
      description ||
      startdate ||
      enddate ||
      goalamount ||
      status
    )
  ) {
    throw new ApiError(500, "All fields are required!!!!");
  }

  const camp = await Campaign.find({ title: campaignName });
  if (camp.length > 0) {
    const project = await Project.create({
      campaign_name: campaignName,
      project_title: title,
      project_image: req.file.path,
      project_description: description,
      start_date: startdate,
      end_date: enddate,
      goal_amount: goalamount,
      status: status,
      campaign_id: camp[0]._id,
      createdBy: req.user._id,
      image: `/uploads/${req.file?.originalname}`,
    });
    if (!project) {
      throw new ApiError(
        501,
        "Something went wrong while creating your project!!\n Please try again later"
      );
    }
    try {
      const existcamp = await Campaign.updateOne({_id : camp[0]._id},{$push:{allprojects:project._id}})
    } catch (error) {
      throw new ApiError(500,error)
    }
    return res
      .status(201)
      .json(new ApiResponse(201, project, "Project created successfully"));
  } else {
    console.log("in else");
    const camp = await Campaign.create({
      title: campaignName,
    });
    console.log(camp._id);
    const project = await Project.create({
      campaign_name: campaignName,
      project_title: title,
      project_image: req.file.path,
      project_description: description,
      start_date: startdate,
      end_date: enddate,
      goal_amount: goalamount,
      status: status,
      campaign_id: camp._id,
      createdBy: req.user._id,
      image: `/uploads/${req.file?.filename}`,
    });
    if (!project) {
      throw new ApiError(
        501,
        "Something went wrong while creating your project!!\n Please try again later"
      );
    }
    try {
      await Campaign.updateOne({_id : camp._id},{$push:{allprojects:project._id}})
    } catch (error) {
      throw new ApiError(500,error)
    }
    return res
      .status(201)
      .json(new ApiResponse(201, project, "Project created successfully"));
  }
});

const getproject = asyncHandler(async (req, res) => {
  console.log(req.params.id);
  const project = await Project.findById(req.params.id);

  if (!project) {
    throw new ApiError(404, "Not Found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, project, "Successfully retrieved the data"));
});

const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: req.body,
    },
    { new: true }
  );
  if (!project) {
    throw new ApiError(404, "Project Not Found!!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, project, "Updated Successfully!"));
});

const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  // await Campaign.
  if (!project) {
    throw new ApiError(404, "No such project exists");
  }
  return res.status(200).json(new ApiResponse(200, "Deleted Successfully"));
});

module.exports = { createProject, getproject, updateProject, deleteProject };
