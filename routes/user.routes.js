const express = require("express");
const router = express.Router();
const {
  userRegister,
  userLogin,
  userLogOut,
  AllPastProject,
  Profile,
  updateProfile,
  changepassword,
} = require("../controllers/user.controller");
const { verifyJWT } = require("../middlewares/auth.middleware");

router.route("/register").post(userRegister);
router.route("/userLogin").post(userLogin);
router.route("/allPastProject").post(verifyJWT,AllPastProject);
router.route("/profile").post(verifyJWT,Profile);
router.route("/updateProfile").post(verifyJWT,updateProfile);
router.route("/changepassword").post(verifyJWT,changepassword);
router.route("/userLogOut").post(verifyJWT,userLogOut);

module.exports = router;
