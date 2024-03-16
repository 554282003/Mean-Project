const express = require('express')
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.static("public"))
app.use(cookieParser())

const userRoute = require("./routes/user.routes");

app.use("/api/v1/users",userRoute)


module.exports = {app}