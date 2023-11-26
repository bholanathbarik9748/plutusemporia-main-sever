const stockModel = require("../../model/stockRecommentation");

module.exports.getAllStocks = async (req, res) => {
  try {
    const stockRecommendations = await stockModel
      .find({ isActive: true })
      .sort({ createdAt : -1 })
      .exec();

    res.status(200).json({
      status: true,
      data: stockRecommendations,
    });
  } catch (error) {
    console.error("Error fetching stock recommendations:", error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

module.exports.createStockRecommendation = async (req, res) => {
  const { stockName, sector, targetPrice, stockLink } = req.body;

  if (!stockName || !sector || !targetPrice || !stockLink) {
    res
      .status(400)
      .json({ status: false, error: "Please provide all required fields." });
    return;
  }

  try {
    const newStockRecommendation = new stockModel({
      stockName,
      sector,
      targetPrice,
      stockLink,
    });

    await newStockRecommendation.save();
    res.status(201).json({
      status: true,
      message: "Stock recommendation created successfully",
      data: newStockRecommendation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: "INTERNAL SERVER ERROR" });
  }
};

module.exports.deleteStockRecommendation = async (req, res) => {
  const { stockId } = req.params;

  console.log(req.params);
  if (!stockId) {
    res
      .status(400)
      .json({ status: false, error: "Please provide all required fields." });
    return;
  }

  try {
    const updatedStockRecommendation = await stockModel.findOneAndUpdate(
      { _id: stockId },
      { $set: { isActive: false } }
    );

    if (!updatedStockRecommendation) {
      return res.status(404).json({ status: false, error: "Stock not found." });
    }
    return res.status(201).json({ status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: "INTERNAL SERVER ERROR" });
  }
};

module.exports.EditStockRecommendation = async (req, res) => {
  const { stockName, sector, targetPrice, stockLink } = req.body;
  const { stockId } = req.params;

  // Validate the request body
  if (!stockId || !stockName || !sector || !targetPrice || !stockLink) {
    res.status(400).json({
      status: false,
      error: "Please provide all required fields for the update.",
    });
    return;
  }

  try {
    const updatedStockRecommendation = await stockModel.findOneAndUpdate(
      { _id: stockId },
      { $set: { stockName, sector, targetPrice, stockLink } },
      { new: true }
    );

    if (!updatedStockRecommendation) {
      return res
        .status(404)
        .json({ status: false, error: "Stock recommendation not found." });
    }

    res.status(200).json({
      status: true,
      message: "Stock recommendation updated successfully",
      data: updatedStockRecommendation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, error: "INTERNAL SERVER ERROR" });
  }
};
