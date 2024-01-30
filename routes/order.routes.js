const express = require("express");
const router = express.Router();
const { Getorder, AddOrder , DeleteOrder , GetOrderPage , DeleteOrderArray} = require("../controllers/saleController");

// router.get("/", GetCustomer);
router.get("/", Getorder);

router.post("/add", AddOrder);

router.delete("/delete", DeleteOrder);

router.get("/getorderpage", GetOrderPage);

router.delete("/deleteorderarray", DeleteOrderArray);




// router.put("/update/:id", UpdateCustomer);



module.exports = router;