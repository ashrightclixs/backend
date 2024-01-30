const express = require("express");
const router = express.Router();
const { GetStockMov , AddStockMov , DeleteStockMov , GetStockMovPage , DeleteStockMovArray} = require("../../controllers/Inventory/stockController");


// router.get("/", GetCustomer);
router.get("/", GetStockMov);

router.post("/add", AddStockMov);

router.delete("/delete", DeleteStockMov);

router.get("/getstockMovpage", GetStockMovPage);

router.delete("/deletestockMovarray", DeleteStockMovArray);



module.exports = router;