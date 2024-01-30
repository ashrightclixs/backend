const express = require("express");
const router = express.Router();
const { GetdashboardInvoice , Adddashboard , Gedashboard , GetInvoiceDashboard} = require("../../controllers/dashboard/dashoardController");


// /dashboard/dashbaord_entries
router.get("/getdashboardinvoice", GetdashboardInvoice);

router.get("/", Gedashboard);


router.post("/add", Adddashboard);

router.get("/dashbaordcheck", GetInvoiceDashboard);


// router.delete("/delete", DeleteStockAdj);

// router.get("/getstockAdjpage", GetStockAdjPage);

// router.delete("/deletestockadjarray", DeleteStockAdjArray);



module.exports = router;