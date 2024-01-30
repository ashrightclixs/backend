const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const stock_inventorySchema = new mongoose.Schema(
  {
    user_id: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    Supplier: {
      type: ObjectId,
      ref: "Supplier",
      required: true,
    },
    stock_inventory: {
      type: Number,
      required: true,
    },
    stock_inventory_name: {
      type: String,
      required: true,
    },
    sku:{
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
    WareHouse: {
      type: ObjectId,
      ref: "Stock_Warehouse",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    amount: {
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

module.exports = mongoose.model("Stock_Inventory", stock_inventorySchema);
