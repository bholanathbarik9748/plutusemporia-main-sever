const mongoose = require("mongoose");

const IntradayRecomputation = new mongoose.Schema(
    {
        nifty50: {
            type: [
                {
                    breakout: { type: String, required: true },
                    support: { type: String, required: true },
                    resistance: { type: String, required: true },
                    target: { type: String, required: true },
                    stoploss: { type: String, required: true },
                },
            ],
            required: [true, "nifty50 is required"],
        },
        bankNifty: {
            type: [
                {
                    breakout: { type: String, required: true },
                    support: { type: String, required: true },
                    resistance: { type: String, required: true },
                    target: { type: String, required: true },
                    stoploss: { type: String, required: true },
                },
            ],
            required: [true, "bankNifty is required"],
        },
        FINNIFTY: {
            type: [
                {
                    breakout: { type: String, required: true },
                    support: { type: String, required: true },
                    resistance: { type: String, required: true },
                    target: { type: String, required: true },
                    stoploss: { type: String, required: true },
                },
            ],
            required: [true, "bankNifty is required"],
        },
        StockFuture: {
            type: [
                {
                    breakout: { type: String, required: true },
                    support: { type: String, required: true },
                    resistance: { type: String, required: true },
                    target: { type: String, required: true },
                    stoploss: { type: String, required: true },
                    stockName: { type: String, required: true }
                },
            ],
            required: [true, "bankNifty is required"],
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

const IntradayRecomputationModel = mongoose.model("IntradayRecomputation", IntradayRecomputation);
module.exports = IntradayRecomputationModel;
