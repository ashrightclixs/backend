const PurchaseOrder = require("../../models/purchase_models/purchase.model");
const PurchaseInvoice = require("../../models/purchase_models/invoice.model");
const PurchaseRefund = require("../../models/purchase_models/refund.model");
const Products = require("../../models/purchase_models/products.model");

const SalesOrder = require("../../models/orders.model");
const SalesRefund = require("../../models/refund.model");

const StockMovement = require("../../models/inventory/add_stock.model");
const StockAdjustment = require("../../models/inventory/add_stock_adj.model");









// order modal

module.exports.Getorder = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.find(req.body).populate([
      {
        path: "product",
        model: "Products",
      },
      {
        path: "tax",
        model: "Tax",
      },
    ]);
    res.status(200).json(purchaseOrder);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.GetOrderPage = async (req, res) => {
  const items_page = 2;
  const page = req.query.page || 1;  // 2 page
  const w = req.query.id;
  try {
    let skip = (page - 1) * items_page;
    const purchaseOrder = await PurchaseOrder.count({ 'user_id': w });
    const items = await PurchaseOrder.find({ 'user_id': w }).limit(items_page).skip(skip)
      .populate([
        {
          path: "product",
          model: "Products",
        },
        {
          path: "tax",
          model: "Tax",
        },
      ]);
    let pageCount = purchaseOrder / items_page;
    let q = Number.isInteger(pageCount) ? pageCount : pageCount;
    res.status(200).json({
      pagination: {
        purchaseOrder,
        skip,
        q,
      }, items

    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

exports.AddOrder = async (req, res, next) => {
  try {
    const purchaseOrder = await PurchaseOrder.create(req.body);
    res.status(201).json(purchaseOrder);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

exports.checkInvoice = async (req, res, next) => {

  const invoice_id= req.query.id;
  const received_money= req.query.recived_money;
  const invoice = await PurchaseInvoice.findById(invoice_id);
  const amount_rec = invoice.received + parseInt(received_money)
    try {
      const Invoice_value = await PurchaseInvoice.findByIdAndUpdate(
        { _id: invoice_id },
        {
          received: amount_rec,
        }
      );
          res.json({ message:  Invoice_value })
  } catch (error) {
      console.log("Not Updated");
  }
};


exports.DeleteOrder = async (req, res) => {
  try {
    let order = await PurchaseOrder.find({ "_id": req.query.id });
    let order1 = await PurchaseOrder.findByIdAndDelete({ "_id": req.query.id })
    for (let i = 0; i < order.length; i++) {
      var refund = await PurchaseRefund.deleteMany({ "order": order[i]._id });
    }
    res.json({ message: "Deleted Successfull" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

exports.DeleteOrderArray = async (req, res) => {
  const id = req.query.id;
  try {
    const myArray = id.split(",");
    myArray.forEach(async (entry) => {
      let order = await PurchaseOrder.find({ "_id": entry });
      let order1 = await PurchaseOrder.findByIdAndDelete({ "_id": entry });
      for (let i = 0; i < order.length; i++) {
        var refund = await PurchaseRefund.deleteMany({ "order": order[i]._id });
      }
    });
    res.status(200).json({
      message: "Deleted Successfull"
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};




// sales invoice

module.exports.GetInvoice = async (req, res) => {
  try {
    const purchaseInvoice = await PurchaseInvoice.find({
      user_id: req.query.id,
    })
      .populate([
        {
          path: "tax",
          model: "Tax",
        },
      ])
    res.status(200).json(purchaseInvoice);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.GetInvoicePage = async (req, res) => {
  const items_page = 10;
  const page = req.query.page || 1;  // 2 page
  const w = req.query.id;
  try {
    let skip = (page - 1) * items_page;
    const purchaseInvoice = await PurchaseInvoice.count({ 'user_id': w });
    const items = await PurchaseInvoice.find({ user_id: w })
      .limit(items_page)
      .skip(skip)
      .populate([
        {
          path: "tax",
          model: "Tax",
        },
      ])
      .sort([["createdAt", "descending"]]);
    let pageCount = purchaseInvoice / items_page;
    let q = Number.isInteger(pageCount) ? pageCount : pageCount;
    res.status(200).json({
      pagination: {
        purchaseInvoice,
        skip,
        q,
      }, items

    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}


exports.GetPurchaseChallan = async (req, res) => {
  const id = req.query.id;
  try {
    const invoice = await PurchaseInvoice.findById(id).sort([
      ["createdAt", "descending"],
    ]);
    res.status(201).json({ message: "Delivery Fetched Successfully", invoice });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.AddInvoice = async (req, res, next) => {
  try {
    const purchaseInvoice = await PurchaseInvoice.create(req.body);
    res.status(201).json(purchaseInvoice);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};


exports.DeleteInvoice = async (req, res) => {
  try {
    const purchaseInvoice = await PurchaseInvoice.deleteMany({ "_id": req.query.id });
    res.json("Deleted Successfull");
  } catch (error) {
    res.json({ message: error.message });
  }
};

exports.DeleteInvoiceArray = async (req, res) => {
  const id = req.query.id;
  try {
    const myArray = id.split(",");
    myArray.forEach(async (entry) => {
      let invoice = await PurchaseInvoice.findByIdAndDelete({ "_id": entry });
    });
    res.status(200).json({
      message: "Deleted Successfull"
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};



module.exports.GetRefund = async (req, res) => {
  try {
    const purchaseRefund = await PurchaseRefund.find().populate([
      {
        path: "tax",
        model: "Tax",
      },
      {
        path: "order",
        model: "PurchaseOrder",
      }
    ]);
    res.status(200).json(purchaseRefund);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.GetRefundPage = async (req, res) => {
  const items_page = 2;
  const page = req.query.page || 1;  // 2 page
  const w = req.query.id;
  try {
    let skip = (page - 1) * items_page;
    const purchaseRefund = await PurchaseRefund.count({ 'user_id': w });
    const items = await PurchaseRefund.find({ 'user_id': w }).limit(items_page).skip(skip)
      .populate([
        {
          path: "order",
          model: "PurchaseOrder",
        },
        {
          path: "tax",
          model: "Tax",
        },
      ]);
    let pageCount = purchaseRefund / items_page;
    let q = Number.isInteger(pageCount) ? pageCount : pageCount;
    res.status(200).json({
      pagination: {
        purchaseRefund,
        skip,
        q,
      }, items

    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}


exports.AddRefund = async (req, res, next) => {
  try {
    const purchaseRefund = await PurchaseRefund.create(req.body);
    res.status(201).json(purchaseRefund);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};


exports.DeleteRefund = async (req, res, next) => {
  try {
    const purchaseRefund = await PurchaseRefund.findByIdAndDelete({ "_id": req.query.id });
    res.json("Deleted Successfull");
  } catch (error) {
    res.json({ message: error.message });
  }
}
exports.DeleteRefundArray = async (req, res) => {
  const id = req.query.id;
  try {
    const myArray = id.split(",");
    myArray.forEach(async (entry) => {
      let purchaseRefund = await PurchaseRefund.findByIdAndDelete({ "_id": entry });
    });
    res.status(200).json({
      message: "Deleted Successfull"
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};



module.exports.GetProduct = async (req, res) => {
  try {
    const products = await Products.find({ "user_id": req.query.id }).populate([
      {
        path: "tax",
        model: "Tax",
      }
    ]);
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};



exports.GetProductPage = async (req, res) => {
  const items_page = 10;
  const page = req.query.page || 1;  // 2 page
  const w = req.query.id;
  try {
    let skip = (page - 1) * items_page;
    const products = await Products.count({ 'user_id': w });
    const items = await Products.find({ 'user_id': w }).limit(items_page).skip(skip)
      .populate([
        {
          path: "tax",
          model: "Tax",
        },
      ]);
    let pageCount = products / items_page;
    let q = Number.isInteger(pageCount) ? pageCount : pageCount;
    res.status(200).json({
      pagination: {
        products,
        skip,
        q,
      }, items

    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}


exports.AddProduct = async (req, res, next) => {
  try {
    const products = await Products.create(req.body);
    res.status(201).json(products);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};


exports.DeleteProduct = async (req, res, next) => {
  try {
    const order1 = await SalesOrder.find({ "product": req.query.id });
    const order = await SalesOrder.deleteMany({ "product": req.query.id });
    for (let i = 0; i < order1.length; i++) {
      var salesRefund = await SalesRefund.deleteMany({ "order": order1[i]._id });
    }
    const purchaseorder = await PurchaseOrder.find({ "product": req.query.id });
    for (let i = 0; i < purchaseorder.length; i++) {
      var purchaseReturn = await PurchaseRefund.deleteMany({ "order": purchaseorder[i]._id });
    }
    const purchaseorder1 = await PurchaseOrder.deleteMany({ "product": req.query.id });
    const stockmovement = await StockMovement.deleteMany({ "product": req.query.id });
    const stockadjustment = await StockAdjustment.deleteMany({ "product": req.query.id });
    const products = await Products.findByIdAndDelete({ "_id": req.query.id });
    res.json("Deleted Successfull");
  } catch (error) {
    res.json({ message: error.message });
  }
}


exports.DeleteProductArray = async (req, res) => {
  const id = req.query.id;
  try {
    const myArray = id.split(",");
    myArray.forEach(async (entry) => {
      const order1 = await SalesOrder.find({ "product": entry });
      const order = await SalesOrder.deleteMany({ "product": entry });

      for (let i = 0; i < order1.length; i++) {
        var salesRefund = await SalesRefund.deleteMany({ "order": order1[i]._id });
      }

      const purchaseorder = await PurchaseOrder.find({ "product": entry });

      for (let i = 0; i < purchaseorder.length; i++) {
        var purchaseReturn = await PurchaseRefund.deleteMany({ "order": purchaseorder[i]._id });
      }
      
      const purchaseorder1 = await PurchaseOrder.deleteMany({ "product": entry });
      const stockmovement = await StockMovement.deleteMany({ "product": entry });
      const stockadjustment = await StockAdjustment.deleteMany({ "product": entry });
      const products = await Products.findByIdAndDelete({ "_id": entry });
    });

    res.status(200).json({
      message: "Deleted Successfull"
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};




