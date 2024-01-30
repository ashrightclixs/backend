const express = require("express");
const router = express.Router();
const {
  GetDeliveryChallan,
  Getdelivery,
  Adddelivery,
  DeleteDelivery,
  GetDeliveryPage,
  DeleteDeliveryArray,
} = require("../controllers/saleController");
const multer = require("multer");

// router.get("/", GetCustomer);
router.get("/", Getdelivery);
router.get("/delivery_challan", GetDeliveryChallan);
//FILE STORAGE VARIABLE 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/add",upload.single("attachment"), Adddelivery);

// zaid changing

router.delete("/delete", DeleteDelivery);

router.get("/getdeliveryPage", GetDeliveryPage);

router.delete("/deletedeliveryarray", DeleteDeliveryArray);




// router.put("/update/:id", UpdateCustomer);




module.exports = router;