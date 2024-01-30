const express = require("express");
const router = express.Router();
const {
  GetInvoiceChallan,
  GetInvoice,
  AddInvoice,
  DeleteInvoice,
  GetInvoicePage,
  DeleteInvoiceArray,
  checkStock_Add,
  checkInvoice,
} = require("../controllers/saleController");

// router.get("/", GetCustomer);
router.get("/", GetInvoice);

router.post("/add", AddInvoice);

router.delete("/delete", DeleteInvoice);

router.get("/getinvoicepage", GetInvoicePage);

router.get("/invoice_challan", GetInvoiceChallan);

router.delete("/deleteinvoicearray", DeleteInvoiceArray);

router.post("/checkStockAdd", checkStock_Add);

router.post("/check_invoice", checkInvoice);





module.exports = router;