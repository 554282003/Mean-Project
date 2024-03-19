const { ApiError } = require("../utils/ApiError");
const { asyncHandler } = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");
const { User } = require("../model/User.model");

const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
      const token = req.cookies?.accesstoken || req.header("Authorization");
      if (!token) {
        throw new ApiError(401, "Unauthorized request");
      }
      const decodedtoken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(decodedtoken._id).select("-password");

      if (!user) {
        throw new ApiError(401, "Invalid Access Token");
      }

      req.user = user;
      return next();
    } catch (error) {
      throw new ApiError(401, error?.message || "Invalid access token");
    }
});

module.exports = { verifyJWT };
