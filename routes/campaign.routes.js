const { Router } = require("express");
const router = Router();
const { deleteCampaign } = require("../controllers/campaign.controller");
const { verifyJWT } = require("../middlewares/auth.middleware");

router.route("/deletecampaign/:id").get(verifyJWT, deleteCampaign);

module.exports = router;
