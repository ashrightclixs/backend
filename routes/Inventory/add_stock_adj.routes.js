const express = require("express");
const router = express.Router();
const { GetStockAdj , AddStockAdj , DeleteStockAdj , GetStockAdjPage , DeleteStockAdjArray} = require("../../controllers/Inventory/stockController");


// router.get("/", GetCustomer);
router.get("/", GetStockAdj);

router.post("/add", AddStockAdj);

router.delete("/delete", DeleteStockAdj);

router.get("/getstockAdjpage", GetStockAdjPage);

router.delete("/deletestockadjarray", DeleteStockAdjArray);



module.exports = router;