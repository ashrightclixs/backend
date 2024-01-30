const express = require("express");
const router = express.Router();
const { GetStockMovement , GetStockMovementPage , AddStockMovement } = require("../../controllers/Inventory/stockController");

//  /inventory/stock_movement

// router.get("/", GetCustomer);

router.get("/", GetStockMovement);

router.post("/add", AddStockMovement);

router.get("/getStock_movementPage", GetStockMovementPage);


module.exports = router;