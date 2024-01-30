const mongoose = require("mongoose");
const jwt  = require("jsonwebtoken")
const Joi = require("joi")
const passwordComplexity = require("joi-password-complexity")


const AdminLoginSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    region: {
      type: String,
      required: true,
    },

    image: {
      type: String,
    },
    details: {
      type: String,
    },
    account_number: {
      type: String,
    },
    account_title: {
      type: String,
    },
    bank: {
      type: String,
    },
  },
  { timestamps: true }
);

AdminLoginSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "1d",
  });

  return token
}


const admin_Login = mongoose.model("AdminLogin", AdminLoginSchema);

module.exports = admin_Login
