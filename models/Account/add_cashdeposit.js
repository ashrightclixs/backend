const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const Add_CashDepositSchema = new mongoose.Schema(
    {
        user_id: {
            type: ObjectId,
            ref: "User",
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        currency: {
            type: String,
            required: true,
        },
        deposit_no:{
            type: Number,
            required: true,
        },
        reference: {
            type: String,
            required: true,
        },
        payment_mode:{
            type: String,
            required: true,
        },
        amount:{
            type: Number,
            required: true,
        },
        comments:{
            type: String,
            required: true,
        },
    },
  { timestamps: true }
);

module.exports = mongoose.model("Add_CashDeposit", Add_CashDepositSchema);
