const express = require("express");
const router = express.Router();
const { GetIncomeStatement} = require("../../controllers/statement/statementController");

// /statement/incomestatement

router.get("/", GetIncomeStatement);

module.exports = router;