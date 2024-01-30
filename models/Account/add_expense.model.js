const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const Add_ExpenseSchema = new mongoose.Schema(
    {
        user_id: {
            type: ObjectId,
            ref: "User",
            required: true,
        },

        // type: ObjectId,
        // ref: "BankAccount",
        // required: true,

        pay_from: {
            type: String,
            required: true,
        },
        account_no: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        purpose:{
            type: String,
            required: true,
        },
        expense_no:{
            type: Number,
            required: true,
        },
        currency:{
            type: String,
            required: true,
        },
        expense_account:{
            type: String,
            required: true,
        },
        description:{
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

module.exports = mongoose.model("Add_Expense", Add_ExpenseSchema);
