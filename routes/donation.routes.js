const { Router } = require("express");
const router = Router();
const { donate } = require("../controllers/donation.controller");
const { verifyJWT } = require("../middlewares/auth.middleware");

router.route("/donate").post(verifyJWT, donate);

module.exports = router;