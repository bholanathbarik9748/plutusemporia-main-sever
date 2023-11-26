const mongoose = require("mongoose");

const stockRecomputation = new mongoose.Schema(
  {
    stockName: {
      type: String,
      required: [true, "stock Name is required"],
    },
    sector: {
      type: String,
      required: [true, "Password is required"],
    },
    targetPrice: {
      type: String,
      required: [true, "target Price is required"],
    },
    stockLink: {
      type: String,
      required: [true, "Stock link is required"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("stockRecomputation", stockRecomputation);
module.exports = UserModel;
