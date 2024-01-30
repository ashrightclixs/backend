const express = require("express");
const router = express.Router();
const { AddCustomer, GetCustomer , DeleteCustomer , GetCustomerPage , GetInvoiceCustomer } = require("../controllers/saleController");

// router.get("/", GetCustomer);
router.get("/", GetCustomer);

router.get("/getcustomerinvoice", GetInvoiceCustomer);


router.post("/add", AddCustomer);

// zaid changing

router.delete("/delete", DeleteCustomer);

// GetCustomerPage

router.get("/getcustomerpage", GetCustomerPage);


// router.put("/update/:id", UpdateCustomer);




module.exports = router;
