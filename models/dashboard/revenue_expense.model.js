const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const DashboardRevenueSchema = new mongoose.Schema(
  {
    user_id: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("DashboardRevenue", DashboardRevenueSchema);
