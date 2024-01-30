const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const deliverySchema = new mongoose.Schema(
  {
    user_id: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    invoice: {
      type: ObjectId,
      ref: "Invoice",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    delivery_id: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    charges: {
      type: Number,
      required: true,
    },
    attachment: {
      type: String,
      default: "-",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Delivery", deliverySchema);
