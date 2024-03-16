const { User } = require("../model/User.model");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const { asyncHandler } = require("../utils/asyncHandler");

const createaccesstoken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accesstoken = await user.generateAccessToken();
    return { accesstoken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong");
  }
};

const userRegister = asyncHandler(async (req, res) => {
  const { fullname, username, email, password, roles } = req.body;

  if (!fullname || !username || !email || !password || !roles) {
    throw new ApiError(400, "Bad request: missing parameters.");
  }

  const existeduser = await User.find({
    $or: [{ email }, { username }],
  });
  console.log(existeduser);

  if (!(existeduser.length == 0)) {
    throw new ApiError(400, "User already exist.");
  }

  const user = await User.create({
    fullname,
    username: username.toLowerCase(),
    email,
    password,
    roles,
  });

  const createduser = await User.findById(user._id).select("-password");
  console.log(createduser);

  if (!createduser) {
    throw new ApiError(500, "Something went wrong while creating user.");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createduser, "User Created."));
});

const userLogin = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (!(username || email)) {
    throw new ApiError(400, "username or email is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User not found.Please register first");
  }

  const ispasswordvalid = await user.isPasswordCorrect(password);

  if (!ispasswordvalid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const { accesstoken } = await createaccesstoken(user._id);
  const loggedInUser = await User.findById(user._id).select("-password");

  const option = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accesstoken", accesstoken, option)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser },
        "User logged in successfully"
      )
    );
});

const AllPastProject = asyncHandler(async (req, res) => {
  const AllUserProject = await User.findById(req.user.projectHistory);
  if (!AllUserProject) {
    console.log("error");
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "No Project has been created!!"));
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, AllUserProject, "Project fetched successfully!!")
    );
});

const Profile = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User data fetched successfully"));
});

const userLogOut = asyncHandler(async (req, res) => {
  const option = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accesstoken", option)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const updateProfile = asyncHandler(async (req, res) => {
  const { fullname, email, username } = req.body;
  if (!(fullname || email || username)) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          {},
          "Nothing is changed because data were not given!!"
        )
      );
  }

  const user = await User.findById(req.user._id);

  if (!user) return res.status(404).json(new ApiError(404, " User not found"));

  if (fullname) {
    user.fullname = fullname;
  }
  if (email) {
    user.email = email;
  }
  if (username) {
    user.username = username;
  }

  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User profile updated successfully"));
});

const changepassword = asyncHandler(async (req, res) => {
  const {oldpassword,newpassword} = req.body;

  if(!(oldpassword && newpassword)) return res.status(500).json(new ApiError(500,{},"oldpassword and newpassword field can't be empty"));

  const user = await User.findById(req.user._id)
  const isPasswordCorrect = await user.isPasswordCorrect(oldpassword)

  if(!isPasswordCorrect){
    throw new ApiError(500,'Incorrect old password')
  }

  user.password = newpassword;
  await user.save({validateBeforeSave : false})
  
  return res.status(200).json(new ApiResponse(200,{},"Password is changed."))

});

module.exports = {
  userRegister,
  userLogin,
  userLogOut,
  AllPastProject,
  Profile,
  updateProfile,
  changepassword
};
