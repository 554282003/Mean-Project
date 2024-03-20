const { Router } = require('express')
const router = Router();
const {createProject,getproject,updateProject,deleteProject} = require("../controllers/project.controller")
const {verifyJWT} = require("../middlewares/auth.middleware")
const {upload} = require("../utils/multer")

router.route("/createproject").post(upload.single('image'),createProject)
router.route("/getproject/:id").get(getproject)
router.route("/updateproject/:id").get(updateProject)
router.route("/deleteproject/:id").get(deleteProject)

module.exports = router