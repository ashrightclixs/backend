const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const entriesSchema = new mongoose.Schema(
    {
        user_id: {
            type: ObjectId,
            ref: "User",
            required: true,
        },
        order: {
            type: Number,
            required: true,
        },
        account_receivable: {
            type: Number,
            required: true,
        },
        account_payable: {
            type: Number,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        date:{
            type: String,
            required: true,
        },
     
    },
  { timestamps: true }
);

module.exports = mongoose.model("Entries", entriesSchema);
