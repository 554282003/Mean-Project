const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    projectHistory:
      [{type : Schema.Types.ObjectId,
      ref: "Project"}],
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: String,
      enum: ["donor", "campaign creater"],
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});
  UserSchema.methods.isPasswordCorrect = async function (password) {
    console.log(password, this.password);
    return await bcrypt.compare(password, this.password);
  };

  UserSchema.methods.generateAccessToken = async function () {
    return jwt.sign(
      {
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );
  };


const User = model("User", UserSchema);
module.exports = { User };
