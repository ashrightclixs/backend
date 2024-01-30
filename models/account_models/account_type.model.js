const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const AccountTypeSchema = new mongoose.Schema(
    {
        user_id: {
            type: ObjectId,
            ref: "User",
            required: true,
        },
        account_type: {
            type: ObjectId,
            ref: "AccountParent",
            required: true,
        },
        account_name: {
            type: String,
            required: true,
        },
        account_code:{
            type: Number,
            required: true,
        },
        discription: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        }
        

    },
    { timestamps: true }
);

module.exports = mongoose.model("AccountType",AccountTypeSchema);
