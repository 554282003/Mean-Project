const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();
const { verifyJWT } = require("./middlewares/auth.middleware");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.static(path.resolve("./public")));
// app.use(verifyJWT)

// Import All Routes
const userRoute = require("./routes/user.routes");
const projectRoute = require("./routes/project.routes");
const campaignRoute = require("./routes/campaign.routes");
const donationRoute = require("./routes/donation.routes");

// User Routes
app.use("/api/v1/users", userRoute);
// Project Routes
app.use("/api/v1/project", verifyJWT,projectRoute);
// Campaign Routes
app.use("/api/v1/campaign", campaignRoute)
// donation Routes
app.use("/api/v1/donation", donationRoute);

module.exports = { app };
