const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;


const purchaseOrderSchema = new mongoose.Schema(
    {
        user_id: {
            type: ObjectId,
            ref: "User",
            required: true,
        },
        order:{
            type: Number,
            required: true,
        },
        product:{
            type: ObjectId,
            ref :"Products",
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
        subject: {
            type: String,
            required: true,
        },
        ware_house:{
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

module.exports = mongoose.model("PurchaseOrder", purchaseOrderSchema);
