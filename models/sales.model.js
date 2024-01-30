const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;


const salesSchema = new mongoose.Schema(
  {
    total_amount: {
      type: Number,
      trim: true,
    },

    user_id: {
      type: ObjectId,
      ref: "User",
      required: true,
    },

    qoutation: {
      type: ObjectId,
      ref: "Qoutation",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sales", salesSchema);