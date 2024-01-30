const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const stock_warehouse_schema = new mongoose.Schema(
    {
        user_id: {
            type: ObjectId,
            ref: "User",
            required: true,
        },
        stock_warehouse: {
            type: Number,
            required: true,
        },
        stock_warehouse_name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        phone_number: {
            type: String,
            required: true,
        },
        date: {
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

module.exports = mongoose.model("Stock_Warehouse", stock_warehouse_schema);
