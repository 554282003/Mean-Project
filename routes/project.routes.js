const { Router } = require('express')
const router = Router();
const {createProject,getproject,updateProject,deleteProject} = require("../controllers/project.controller")
const {verifyJWT} = require("../middlewares/auth.middleware")
const {upload} = require("../utils/multer")

router.route("/createProject").post(verifyJWT,upload.single('image'),createProject)
router.route("/getproject/:id").get(verifyJWT,getproject)
router.route("/updateproject/:id").get(verifyJWT,updateProject)
router.route("/deleteproject/:id").get(verifyJWT,deleteProject)

module.exports = router