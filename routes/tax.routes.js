const express = require("express");
const router = express.Router();
const { AddTax, GetTax , GetTaxPage , DeleteTax} = require("../controllers/saleController");

router.get("/", GetTax);
router.post("/add", AddTax);
router.delete("/delete", DeleteTax);
router.get("/gettaxpage", GetTaxPage);


module.exports = router;
