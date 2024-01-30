const express = require('express');
const router = express.Router()
const { AddRefund, GetRefund , DeleteRefund , GetRefundPage , DeleteRefundArray} = require("../controllers/saleController");



router.get("/", GetRefund);

router.post("/add", AddRefund);

// 


router.delete("/delete", DeleteRefund);

router.get("/getrefundpage",GetRefundPage);

router.delete("/deleterefundarray", DeleteRefundArray);




module.exports = router