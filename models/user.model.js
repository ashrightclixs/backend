const mongoose = require("mongoose");
const jwt  = require("jsonwebtoken")
const Joi = require("joi")
const passwordComplexity = require("joi-password-complexity")


const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    superAdmin : {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
    isadmin:{
      type: Boolean,
      required: true,
    },
    status:{
      type: Boolean,
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
    current_date: {
      type: String,
    },
    due_date: {
      type: String,
    },
    plan: {
      type: String,
    },
    bank: {
      type: String,
    },
    attachment: {
      type: String,
      default: "-",
    },
    ip_addresss:{
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "1d",
  });

  return token
}


const User = mongoose.model("User", userSchema);

module.exports = User
