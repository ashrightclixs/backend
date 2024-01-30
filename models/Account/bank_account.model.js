const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const bank_accountSchema = new mongoose.Schema(
  {
    user_id: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    bank_name: {
      type: String,
      required: true,
    },
    amount:{
      type: Number,
      required: true,
    },
    account_name: {
      type: String,
      required: true,
    },
    branch_name: {
      type: String,
      required: true,
    },

    bank_account_title: {
      type: String,
      required: true,
    },
    bank_account_number: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BankAccount", bank_accountSchema);
