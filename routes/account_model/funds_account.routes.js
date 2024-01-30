const express = require("express");
const router = express.Router();
const { GetAdd_Funds  , Add_Add_Funds  , DeleteAdd_Funds  , GetAdd_FundsPage } = require("../../controllers/accounts/accountsController");

// /accounts/funds_account

router.get("/", GetAdd_Funds );

router.post("/add", Add_Add_Funds );

router.delete("/delete", DeleteAdd_Funds );

router.get("/get_add_funds_page", GetAdd_FundsPage);

module.exports = router;