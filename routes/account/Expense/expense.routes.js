const express = require("express");
const router = express.Router();
const { GetExpense , AddExpense , DeleteExpense } = require("../../../controllers/accounts/accountsController");


// router.get("/", GetCustomer);
router.get("/", GetExpense);

router.post("/add", AddExpense);

router.delete("/delete", DeleteExpense);

module.exports = router;