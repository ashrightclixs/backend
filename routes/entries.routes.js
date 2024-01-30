const express = require("express");
const router = express.Router();
const { GetEntries , AddEntries  ,DeleteEntries, GetEntriesdashboard} = require("../controllers/saleController");

// router.get("/", GetCustomer);DeleteEntries
router.get("/", GetEntries);

router.post("/add", AddEntries);

router.delete("/delete", DeleteEntries);


router.get("/Getentries", GetEntriesdashboard);


// router.put("/update/:id", UpdateCustomer);




module.exports = router;