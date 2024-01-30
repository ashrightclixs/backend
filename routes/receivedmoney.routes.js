const express = require('express');
const router = express.Router()
const { AddMoney, GetMoney , DeleteMoney , GetMoneyPage , DeleteMoneyArray} = require("../controllers/saleController");



router.get("/", GetMoney);

router.post("/add", AddMoney);

router.delete("/delete", DeleteMoney);

router.get("/getmoneypage", GetMoneyPage);

router.delete("/deletemoneyarray", DeleteMoneyArray);

module.exports = router