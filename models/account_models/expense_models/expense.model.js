const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ExpenseSchema = new mongoose.Schema(
    {
        user_id: {
            type: ObjectId,
            ref: "User",
            required: true,
        },
        expense_type: {            
            type: ObjectId,
            ref: "AccountType",
            required: true,
        },
        expense_number:{
            type: Number,
            required: true,
        },
        payfrom:{                    //it will be change id after soon its replace from cash id;
            type: ObjectId,
            ref: "AccountType",
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        reference: {
            type: String,
            required: true,
        },
        currency: {
            type: String,
            required: true,
        },
        discription: {
            type: String,
            required: true,
        },
        comments: {
            type: String,
            required: true,
        },
        tax: {
            type: ObjectId,
            ref: "tax",
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Expense", ExpenseSchema);
