const express = require("express");
const router = express.Router();
const { GetAccountParent , AddAccountParent , DeleteAccountParent } = require("../../controllers/accounts/accountsController");


// router.get("/", GetCustomer);
router.get("/", GetAccountParent);

router.post("/add", AddAccountParent);

router.delete("/delete", DeleteAccountParent);

module.exports = router;