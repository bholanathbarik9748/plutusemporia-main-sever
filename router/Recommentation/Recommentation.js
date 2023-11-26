const { Router } = require('express');
const router = Router();

// import controller
const stockController = require('../../controller/StockRecommentation/StockRecommRoute');
const intradayController = require('../../controller/intradayRecommentation/intradayRecommentation');

router.get("/recommend/stock", stockController.getAllStocks);
router.post("/recommend/stock/create", stockController.createStockRecommendation);
router.patch("/recommend/stock/delete/:stockId", stockController.deleteStockRecommendation);
router.post("/recommend/stock/update/:stockId", stockController.EditStockRecommendation);
router.get("/recommend/intraday", intradayController.getAllIntradayRecommendation);
router.post("/recommend/intraday/create", intradayController.createIntradayRecommendation);
router.patch("/recommend/intraday/delete/:intradayId", intradayController.deleteIntradayRecommendation);
router.post("/recommend/intraday/update/:intradayId", intradayController.EditIntradayRecommendation);

module.exports = router;