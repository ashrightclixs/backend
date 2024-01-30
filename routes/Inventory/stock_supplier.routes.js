const express = require("express");
const router = express.Router();
const {
  GetSupplierPage,
  GetSupplier,
  AddSupplier,
} = require("../../controllers/Inventory/stockController");

router.get("/", GetSupplier);

router.post("/add", AddSupplier);

router.get("/getsupplierpage", GetSupplierPage);

module.exports = router;
