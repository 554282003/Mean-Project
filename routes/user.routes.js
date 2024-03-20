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
router.route("/userlogin").post(userLogin);
router.route("/allpastproject").post(verifyJWT,AllPastProject);
router.route("/profile").post(verifyJWT,Profile);
router.route("/updateprofile").post(verifyJWT,updateProfile);
router.route("/changepassword").post(verifyJWT,changepassword);
router.route("/userlogout").post(verifyJWT,userLogOut);

module.exports = router;
