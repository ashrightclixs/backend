const express = require("express");
const router = express.Router();
const {
  GetInvoice,
  GetPurchaseChallan,
  AddInvoice,
  DeleteInvoice,
  GetInvoicePage,
  DeleteInvoiceArray,
  checkInvoice,
} = require("../../controllers/Purchase/purchaseController");


// router.get("/", GetCustomer);
router.get("/", GetInvoice);

router.post("/add", AddInvoice);

router.delete("/delete", DeleteInvoice);

router.get("/getinvoicepage", GetInvoicePage);

router.get("/purchase_challan", GetPurchaseChallan);

router.delete("/deleteinvoicearray", DeleteInvoiceArray);

router.post("/check_Invoice_purchase", checkInvoice);




module.exports = router;