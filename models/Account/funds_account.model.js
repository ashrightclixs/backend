const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const Add_FundsSchema = new mongoose.Schema(
    {
        user_id: {
            type: ObjectId,
            ref: "User",
            required: true,
        },
        funds_no:{
            type: Number,
            required: true,
        },
        from_account: {
            type: String,
            required: true,
        },
        to_account: {
            type: String,
            required: true,
        },
        purpose:{
            type: String,
            required: true,
        },
        amount:{
            type: String,
            required: true,
        },
        comments:{
            type: String,
            required: true,
        },
    },
  { timestamps: true }
);

module.exports = mongoose.model("Add_Funds", Add_FundsSchema);
