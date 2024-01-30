const express = require("express");
const router = express.Router();
const { GetAdd_CashDeposit , Add_Add_CashDeposit , GetAdd_CashDepositPage , GetTrialBalance} = require("../../controllers/accounts/accountsController");

// /accounts/cash_deposit

router.get("/", GetAdd_CashDeposit);

router.post("/add", Add_Add_CashDeposit);

router.get("/cash_depositpage", GetAdd_CashDepositPage);

router.get("/gettrialbalance", GetTrialBalance);




module.exports = router;