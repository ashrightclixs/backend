const express = require("express");
const router = express.Router();
const { GetRefund , AddRefund , DeleteRefund , GetRefundPage , DeleteRefundArray} = require("../../controllers/Purchase/purchaseController");


// router.get("/", GetCustomer);
router.get("/", GetRefund);

router.post("/add", AddRefund);

router.delete("/delete", DeleteRefund);

router.get("/getrefundpage", GetRefundPage);

router.delete("/deleterefundarray", DeleteRefundArray);



module.exports = router;