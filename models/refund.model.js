const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const RefundSchema = new mongoose.Schema(
    {
        user_id: {
            type: ObjectId,
            ref: "User",
            required: true,
        },
        customer: {
            type: ObjectId,
            ref: "Customer",
            required: true,
        },
        refund:{
            type: Number,
            required: true,
        },
        order: {
            type: ObjectId,
            ref: "Order",
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

        subject: {
            type: String,
            required: true,
        },
     
    },
  { timestamps: true }
);

module.exports = mongoose.model("Refund", RefundSchema);
