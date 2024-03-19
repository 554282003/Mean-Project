const express = require("express");
const cookieParser = require("cookie-parser");
const { verifyJWT } = require("./middlewares/auth.middleware");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.static(path.resolve("./public")));
// app.use(verifyJWT)

// Import All Routes
const userRoute = require("./routes/user.routes");
const projectRoute = require("./routes/project.routes");
const { exit } = require("process");

// User Routes
app.use("/api/v1/users", userRoute);
// Project Routes
app.use("/api/v1/project", projectRoute);

module.exports = { app };
