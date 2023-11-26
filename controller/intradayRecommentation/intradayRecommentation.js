const IntradayRecomputationModel = require("../../model/IntradayRecommentation");

module.exports.getAllIntradayRecommendation = async (req,res) => {
  try {
    const IntradayRecomputation = await IntradayRecomputationModel
      .find({ isActive: true })
      .sort({ createdAt: -1 })
      .exec();

    res.status(200).json({
      status: true,
      data: IntradayRecomputation,
    });
  } catch (error) {
    console.error("Error fetching stock recommendations:", error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
}

module.exports.createIntradayRecommendation = async (req, res) => {
  const { nifty50, bankNifty, FINNIFTY, StockFuture } = req.body;

  // Validate the request body
  if (!nifty50 || !bankNifty || !FINNIFTY || !StockFuture) {
    res
      .status(400)
      .json({ status: false, error: "Please provide all required fields." });
    return;
  }

  try {
    const newIntradayRecommendation = new IntradayRecomputationModel({
      nifty50,
      bankNifty,
      FINNIFTY,
      StockFuture,
    });

    await newIntradayRecommendation.save();
    res.status(201).json({
      status: true,
      message: "Intraday recommendation created successfully",
      data: newIntradayRecommendation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, error: "INTERNAL SERVER ERROR" });
  }
};

module.exports.deleteIntradayRecommendation = async (req, res) => {
  const { intradayId } = req.params;

  if (!intradayId) {
    res
      .status(400)
      .json({ status: false, error: "Please provide all required fields." });
    return;
  }

  try {
    const updatedIntradayRecommendation =
      await IntradayRecomputationModel.findOneAndUpdate(
        { _id: intradayId },
        { $set: { isActive: false } }
      );

    if (!updatedIntradayRecommendation) {
      return res
        .status(404)
        .json({ status: false, error: "Intraday recommendation not found." });
    }
    return res.status(200).json({ status: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, error: "INTERNAL SERVER ERROR" });
  }
};

module.exports.EditIntradayRecommendation = async (req, res) => {
  const { nifty50, bankNifty, FINNIFTY, StockFuture } = req.body;
  const { intradayId } = req.params;

  // Validate the request body
  if (!intradayId || !nifty50 || !bankNifty || !FINNIFTY || !StockFuture) {
    res.status(400).json({
      status: false,
      error: "Please provide all required fields for the update.",
    });
    return;
  }

  try {
    const updatedIntradayRecommendation =
      await IntradayRecomputationModel.findOneAndUpdate(
        { _id: intradayId },
        { $set: { nifty50, bankNifty, FINNIFTY, StockFuture } },
        { new: true }
      );

    if (!updatedIntradayRecommendation) {
      return res
        .status(404)
        .json({ status: false, error: "Intraday recommendation not found." });
    }

    res.status(200).json({
      status: true,
      message: "Intraday recommendation updated successfully",
      data: updatedIntradayRecommendation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, error: "INTERNAL SERVER ERROR" });
  }
};
