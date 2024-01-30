const express = require("express");
const router = express.Router();
 const { GetProduct , AddProduct , DeleteProduct , GetProductPage , DeleteProductArray} = require("../../controllers/Purchase/purchaseController");

 router.get("/", GetProduct);

router.post("/add", AddProduct);

router.delete("/delete", DeleteProduct);

router.get("/getproductpage", GetProductPage);

router.delete("/deleteproductarray", DeleteProductArray);


module.exports = router;
