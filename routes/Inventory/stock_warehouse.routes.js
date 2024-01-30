const express = require("express");
const router = express.Router();
const {
  GetStockWarehouse,
  GetWarehousePdf,
  GetStockWarehousePage,
  AddStockWarehousePage,
} = require("../../controllers/Inventory/stockController");

//   /inventory/stock_warehouse

// router.get("/", GetCustomer);
router.get("/", GetStockWarehouse);

router.post("/add", AddStockWarehousePage);

router.get("/getStock_WarehousePage", GetStockWarehousePage);

router.get("/warehouse_pdf", GetWarehousePdf);

// router.delete("/delete", DeleteStockMov);

// router.delete("/deletestockMovarray", DeleteStockMovArray);


module.exports = router;