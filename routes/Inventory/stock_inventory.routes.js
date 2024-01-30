const express = require("express");
const router = express.Router();
const {
  GetStockInventory,
  GetStockInventory_value,
  GetInventory,
  GetStockInventoryPage,
  AddStockInventory,
  GetStockInventoryWarehouse,
  checkStock_Add,
  GetStockInventoryfind,
  GetStockSupplier_value,
} = require("../../controllers/Inventory/stockController");

//   //inventory/stock_inventory

// router.get("/", GetCustomer);

router.get("/", GetStockInventory);

router.get("/stockinventory_value", GetStockInventory_value);

router.get("/stocksupplier_value", GetStockSupplier_value);


router.post("/add", AddStockInventory);

router.get("/getStock_inventoryPage", GetStockInventoryPage);

router.get("/getware_house", GetStockInventoryWarehouse);

router.post("/checkStock_Add", checkStock_Add);

router.get("/Stockfind", GetStockInventoryfind);

router.get("/GetInventory", GetInventory);






module.exports = router;