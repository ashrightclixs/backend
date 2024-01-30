const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const add_stockSchema = new mongoose.Schema(
    {
        user_id: {
            type: ObjectId,
            ref: "User",
            required: true,
        },
        stock: {
            type: Number,
            required: true,
        },
        to_ware_house: {
            type: String,
            required: true,
        },
        from_ware_house: {
            type: String,
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
        reference: {
            type: String,
            required: true,
        },
        product: {
            type: ObjectId,
            ref: "Products",
            required: true,
        },
        quantity: {
            type: Number,
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
     
    },
    { timestamps: true }
);

module.exports = mongoose.model("AddStock", add_stockSchema);
