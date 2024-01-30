const express = require("express");
const router = express.Router();
const { GetBankAccount , AddBankAccount , DeleteBankAccount ,GetBankAccountPage , checkBank } = require("../../controllers/accounts/accountsController");

// /accounts/bank_account

router.get("/", GetBankAccount);

router.post("/add", AddBankAccount);

router.post("/checkBank", checkBank);


router.delete("/delete", DeleteBankAccount);

router.get("/getbankaccountpage", GetBankAccountPage);


module.exports = router;