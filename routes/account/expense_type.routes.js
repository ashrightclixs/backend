const express = require("express");
const router = express.Router();
const { GetAccountType , AddAccountType , DeleteAccountType } = require("../../controllers/accounts/accountsController");


// router.get("/", GetCustomer);
router.get("/", GetAccountType);

router.post("/add", AddAccountType);

router.delete("/delete", DeleteAccountType);

module.exports = router;