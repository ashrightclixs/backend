const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const StockMovementSchema = new mongoose.Schema(
    {
        user_id: {
            type: ObjectId,
            ref: "User",
            required: true,
        },
        stock_movement: {
            type: Number,
            required: true,
        },
        from_ware_house: {
            type: ObjectId,
            ref: "Stock_Warehouse",
            required: true,
        },
        to_ware_house: {
            type: String,
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
        product_id: {
            type: ObjectId,
            ref: "Stock_Inventory",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        comments: {
            type: String,
            required: true,
        },
     
    },
    { timestamps: true }
);

module.exports = mongoose.model("StockMovement", StockMovementSchema);
