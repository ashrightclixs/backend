const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const add_stock_adjSchema = new mongoose.Schema(
  {
    user_id: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    purpose: {
      type: String,
      required: true,
    },
    return_no: {
      type: Number,
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
    stock:{
        type : ObjectId,
        ref : "Stock_Inventory",
        required : true
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
    description: {
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

module.exports = mongoose.model("AddstockAdj", add_stock_adjSchema);
