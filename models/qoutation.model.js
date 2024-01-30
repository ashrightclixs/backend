const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;


const qoutationSchema = new mongoose.Schema(
    {
        user_id: {
            type: ObjectId,
            ref: "User",
            required: true,
        },
        invoice: {
            type: Number,
            required: true,
        },
        customer: {
            type: ObjectId,
            ref: "Customer",
            required: true,
        },
        curr_date: {
            type: String,
            required: true,
        },
        due_date: {
            type: String,
            required: true,
        },
        currency: {
            type: String,
            required: true,
        },
        discription:{
            type: String,
            required: true,
        },
        tax:{
            type: ObjectId,
            ref: "Tax",
            required: true,
        },
        net:{
            type: Number,
            required: true,
        },
        amount:{
            type: Number,
            required: true,
        },
        reference:{
            type: String,
            required: true,
        },
     
    },
    { timestamps: true }
);

module.exports = mongoose.model("Qoutation", qoutationSchema);

