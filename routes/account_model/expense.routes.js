const express = require("express");
const router = express.Router();
const { GetAdd_Expense , AddAdd_Expense , DeleteAdd_Expense , GetAdd_ExpensePage } = require("../../controllers/accounts/accountsController");

// /accounts/add_Expense

router.get("/", GetAdd_Expense);

router.post("/add", AddAdd_Expense);

router.delete("/delete", DeleteAdd_Expense);

router.get("/getadd_expense_page", GetAdd_ExpensePage);

module.exports = router;