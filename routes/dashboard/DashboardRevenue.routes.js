const express = require("express");
const router = express.Router();
const { AddDashboardRevenue,
    GeDashboardRevenue} = require("../../controllers/dashboard/dashoardController");


// /dashboard/dashboard_revenue
router.get("/", GeDashboardRevenue);

router.post("/add", AddDashboardRevenue);


// router.get("/", Gedashboard);

// router.delete("/delete", DeleteStockAdj);

// router.get("/getstockAdjpage", GetStockAdjPage);

// router.delete("/deletestockadjarray", DeleteStockAdjArray);



module.exports = router;