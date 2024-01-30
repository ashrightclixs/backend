const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;


const InvoiceValueSchema = new mongoose.Schema(
    {
        user_id: {
            type: ObjectId,
            ref: "User",
            required: true,
        },
        invoice_value:{
            type: ObjectId,
            ref: "Invoice",
            required: true,
        },
        ware_house_name:{
            type: String,
            required: true,
        },
        ware_house_id:{
            type: ObjectId,
            ref: "Stock_Warehouse",
            required: true,
        },
        product_inventory_id:{
            type: ObjectId,
            ref: "Stock_Inventory",
            required: true,
        },
        product_inventory_name:{
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
        amount:{
            type: Number,
            required: true,
        },
        purchase_price:{
            type: Number,
            required: true,
        },
        profit:{
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Invoice_Value", InvoiceValueSchema);
