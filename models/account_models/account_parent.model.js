const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;


const accountParentSchema = new mongoose.Schema(
    {
        user_id: {
            type: ObjectId,
            ref: "User",
            required: true,
        },
        type:{
            type: String,
            required: true,
        },
        account_parent:{
            type: String,
            required: true,
        },
        number:{
            type :Number,
            required: true,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("AccountParent", accountParentSchema);
