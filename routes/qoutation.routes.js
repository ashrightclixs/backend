const express = require('express');
const router = express.Router()
const { AddQoutation, GetQoutation , DeleteQoutation , GetQoutationPage , GetQoutationArray , DeleteQoutationArray , GetQoutationChallan} = require("../controllers/saleController");



router.get("/", GetQoutation);
router.post("/add", AddQoutation);
router.delete("/delete", DeleteQoutation);
router.get("/Getqoutation", GetQoutationPage); // for pagination
router.get("/GetQoutationChallan", GetQoutationChallan); // for pagination

router.get("/putqoutation", GetQoutationArray); // for pagination
router.delete("/deleteqoutation", DeleteQoutationArray); // for pagination

module.exports = router