const express = require('express')
const app = express();



const userRoute = require("./routes/user.routes")

app.use("/api/v1/users",userRoute)


module.exports = {app}