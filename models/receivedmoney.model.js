const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const receivedSchema = new mongoose.Schema(
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
        date: {
            type: String,
            required: true,
        },

        received_chalan: {
            type: Number,
            required: true,
        },
        
        currency: {
            type: String,
            required: true,
        },
        payment_mode:{
            type: String,
            required: true,
        },
        quantity:{
            type: Number,
            required: true,
        },
        price:{
            type: Number,
            required: true,
        },
        discount:{
            type: Number,
            required: true,
        },
        amount:{
            type: Number,
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
        reference:{
            type: String,
            required: true,
        },
        received: {
            type: Number,
            required: true,
        },
     
    },
  { timestamps: true }
);

module.exports = mongoose.model("Received", receivedSchema);
