const Qoutation = require("../models/qoutation.model");
const Qoutation_Value = require("../models/qoutation_value.model");
const Tax = require("../models/tax.model");
const Customer = require("../models/customer.model");
const Order = require("../models/orders.model");
const Stock_Inventory = require("../models/inventory/stock_inventory.model");
const Invoice = require("../models/invoice.model");
const Invoice_Val = require("../models/invoice_value.model");
// Invoice_Value

const Received = require("../models/receivedmoney.model");
const Delivery = require("../models/delivery.model");
const Refund = require("../models/refund.model");
const Entries = require("../models/entries.model");
const Products = require("../models/purchase_models/products.model");
const multer = require("multer");





// Qoutation

exports.GetQoutation = async (req, res) => {
  try {
    const qoutations = await Qoutation.find({ user_id: req.query.id })
      .populate([
        {
          path: "customer",
          model: "Customer",
        },
        {
          path: "tax",
          model: "Tax",
        },
      ])
      .sort([["createdAt", "descending"]]);;
    res.status(200).json(qoutations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.GetQoutationChallan = async (req, res) => {
  const id = req.query.id;
  try {
    const invoice = await Qoutation.findById(id)
      .populate([
        {
          path: "customer",
          model: "Customer",
        },
        {
          path: "tax",
          model: "Tax",
        },
      ])
      .sort([["createdAt", "descending"]]);

    const invoice_val = await Qoutation_Value.find({
      invoice_value: id,
    }).populate([
      {
        path: "ware_house_id",
        model: "Stock_Warehouse",
      },
      {
        path: "product_inventory_id",
        model: "Stock_Inventory",
      },
    ]);
    res
      .status(201)
      .json({ message: "Delivery Fetched Successfully", invoice, invoice_val });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};



exports.GetQoutationArray = async (req, res) => {
  const page = req.query.page || 1;  // 2 page
  try {
    const myArray = page.split(",");
    myArray.forEach(async (entry) => {
      let result = await Qoutation.findByIdAndUpdate({ "_id": entry }, {
        $set: {
          status: "true"
        }
      })
    });
    res.status(200).json({
      message: "Updated Successfull"
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.DeleteQoutationArray = async (req, res) => {
  const id = req.query.id;
  try {
    const myArray = id.split(",");
    myArray.forEach(async (entry) => {
      let qoutation = await Qoutation.findByIdAndDelete({ "_id": entry });
    });
    res.status(200).json({
      message: "Deleted Successfull"
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.GetQoutationPage = async (req, res) => {
  const items_page = 10;
  const page = req.query.page || 1;  // 2 page
  // const id = ObjectId(req.query.id);
  const w = req.query.id;

  try {
    // console.log(page+""+w);
    let skip = (page - 1) * items_page;
    // const qoutation = await Qoutation.findById(query);
    const qoutations = await Qoutation.count({ 'user_id': w });
    const items = await Qoutation.find({ user_id: w })
      .limit(items_page)
      .skip(skip)
      .populate([
        {
          path: "customer",
          model: "Customer",
        },
        {
          path: "tax",
          model: "Tax",
        },
      ])
      .sort([["createdAt", "descending"]]);
    let pageCount = qoutations / items_page;
    let q = Number.isInteger(pageCount) ? pageCount : pageCount;
    res.status(200).json({
      pagination: {
        qoutations,
        skip,
        q,
      }, items

    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.AddQoutation = async (req, res, next) => {
  try {
    const data = req.query.data;
    const invoice = await Qoutation.create(req.body);
    const Array = data.split(',');
    let chunkSize = 9;
    let result = splitArray(Array, chunkSize);

    for (let i = 0; i < result.length; i++) {
      try {
        Qoutation_Value.create(
          {
            user_id: invoice.user_id,
            invoice_value: invoice._id,
            ware_house_id: result[i][0],
            ware_house_name: result[i][1],
            product_inventory_id: result[i][2],
            product_inventory_name: result[i][3],
            quantity: result[i][4],
            price: result[i][5],
            amount: result[i][6],
            purchase_price: result[i][7],
            profit: result[i][8]
          }
        )
      } catch (error) {
        res.status(404).json({ message: error });
      }
    }
    res.status(200).json({ result });

  } catch (error) {
    res.status(404).json({ message: error });
  }

};

exports.DeleteQoutation = async (req, res) => {
  try {
    const qoutation = await Qoutation.deleteMany({});
    res.status(201).json({ message: "Successfull" });
  } catch (error) {
    res.json({ message: error });
  }
};

exports.GetQoutationdateSearch = async (req, res) => {
  const page = req.query.date || 1;
  try {
    const myArray = page.split(",");
    const date = await Qoutation.find({
      'curr_date': {
        $gt: myArray[1],
        $lt: myArray[0]
      },
      'user_id': w
    });
    myArray.forEach(async (entry) => {
      let result = await Qoutation.find({ "date": entry }, {
        $set: {
          status: "true"
        }
      })
    });
    res.status(200).json({
      date
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Tax


exports.GetTax = async (req, res) => {

  try {
    const tax = await Tax.find({ "user_id": req.query.id });
    res.status(200).json(tax);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }

};

exports.DeleteTax = async (req, res) => {
  try {
    const tax = await Tax.findByIdAndDelete({ "_id": req.query.id });
    res.json("Deleted Successfull");
  } catch (error) {
    res.json({ message: error.message });
  }
};

exports.GetTaxPage = async (req, res) => {
  const items_page = 10;
  const page = req.query.page || 1; // 2 page
  const w = req.query.id;
  try {
    let skip = (page - 1) * items_page;
    const tax = await Tax.count({ user_id: w });
    const items = await Tax.find({ user_id: w })
      .limit(items_page)
      .skip(skip)
      .sort([["createdAt", "descending"]]);
    let pageCount = tax / items_page;
    let q = Number.isInteger(pageCount) ? pageCount : pageCount;
    res.status(200).json({
      pagination: {
        tax,
        skip,
        q,
      },
      items,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// exports.GetTaxPage = async (req, res) => {
//   const items_page = 10;
//   const page = req.query.page || 1;  // 2 page
//   const w = req.query.id;
//   try {
//     let skip = (page - 1) * items_page;
//     const tax =await Tax.count({ 'user_id': w });
//     const items = await Tax.find({ user_id: w })
//       .limit(items_page)
//       .skip(skip)
//       .sort([["createdAt", "descending"]]);
//     let pageCount = tax / items_page;
//     let q = Number.isInteger(pageCount) ? pageCount : pageCount;
//     res.status(200).json({
//       pagination: {
//         tax,
//         skip,
//         q,
//       }, items

//     });
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// }

exports.AddTax = async (req, res, next) => {
  try {
    const tax = await Tax.create(req.body);
    res.status(201).json(tax);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// customer
exports.GetCustomerPage = async (req, res) => {
  const items_page = 10;
  const page = req.query.page || 1;  // 2 page
  const w = req.query.id;
  try {
    let skip = (page - 1) * items_page;
    const customer = await Customer.count({ 'user_id': w });
    const items = await Customer.find({ user_id: w })
      .limit(items_page)
      .skip(skip)
      .sort([["createdAt", "descending"]]);
    let pageCount = customer / items_page;
    let q = Number.isInteger(pageCount) ? pageCount : pageCount;
    res.status(200).json({
      pagination: {
        customer,
        skip,
        q,
      }, items
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

module.exports.GetInvoiceCustomer = async (req, res) => {
  const id = req.query.id
  try {
    const invoice = await Invoice.find({ customer: id }).populate([
      {
        path: "user_id",
        model: "User",
      },
      {
        path: "customer",
        model: "Customer",
      },
      {
        path: "tax",
        model: "Tax",
      },
    ]);
    const invoice_val = []
    for (let i = 0; i < invoice.length; i++) {
      var inv = await Invoice_Val.find({
        invoice_value: invoice[i]._id,
      }).populate([
        {
          path: "invoice_value",
          model: "Invoice",
        },
        {
          path: "ware_house_id",
          model: "Stock_Warehouse",
        },
        {
          path: "product_inventory_id",
          model: "Stock_Inventory",
        },
      ]);
      invoice_val.push(inv);
    }

    res.status(201).json({
      message: "Delivery Fetched Successfully",
      invoice,
      invoice_val,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports.GetCustomer = async (req, res) => {

  try {
    const customer = await Customer.find({ user_id: req.query.id }).sort([
      ["createdAt", "descending"],
    ]);
    res.status(201).json(customer);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
  // Customer.find(req.body, (err, Customer) => {
  //   err ? json(err) : res.json(Customer.reverse());
  // });
};

exports.AddCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json(customer);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};


exports.DeleteCustomer = async (req, res) => {

  try {
    const Arr = [];
    const customer = await Customer.findByIdAndDelete({ "_id": req.query.id });
    const qoutation = await Qoutation.deleteMany({ "customer": req.query.id });
    const order1 = await Order.find({ "customer": req.query.id });
    const order = await Order.deleteMany({ "customer": req.query.id })

    for (let i = 0; i < order1.length; i++) {
      var refund = await Refund.deleteMany({ "order": order1[i]._id });
    }

    const invoice = await Invoice.deleteMany({ "customer": req.query.id });
    const received_money = await Received.deleteMany({ "customer": req.query.id });
    const delivery = await Delivery.deleteMany({ "customer": req.query.id });


    res.json({ message: "Deleted Successfull" });
  } catch (error) {
    res.json({ message: error.message });
  }

};

exports.UpdateCustomer = async (req, res) => {

  const user_id = req.params.user_id;
  try {
    const customer = await Customer.findById(user_id);
    res.json("Updated Successfull");
  } catch (error) {
    res.json({ message: error.message });
  }


  employeeModel.findById(req.params.id, function (err, employee) {
    if (!employee)
      return next(new Error('Unable To Find Employee With This Id'));
    else {
      employee.firstName = req.body.firstName;
      employee.lastName = req.body.lastName;
      employee.email = req.body.email;
      employee.phone = req.body.phone;

      employee.save().then(emp => {
        res.json('Employee Updated Successfully');
      })
        .catch(err => {
          res.status(400).send("Unable To Update Employee");
        });
    }
  });
};

// order modal

module.exports.Getorder = async (req, res) => {
  try {
    const order = await Order.find({ "user_id": req.query.id }).populate([
      {
        path: "product",
        model: "Products",
      },
      {
        path: "customer",
        model: "Customer",
      },
      {
        path: "tax",
        model: "Tax",
      },
    ]);
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.AddOrder = async (req, res, next) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

exports.DeleteOrder = async (req, res) => {
  try {
    const order = await Order.find({ "_id": req.query.id });
    const order1 = await Order.findByIdAndDelete({ "_id": req.query.id })
    for (let i = 0; i < order.length; i++) {
      var refund = await Refund.deleteMany({ "order": order1[i]._id });
    }

    var entries = await Entries.deleteMany({ "order": order.order });


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
      let order = await Order.find({ "_id": entry });
      let order1 = await Order.findByIdAndDelete({ "_id": entry });
      for (let i = 0; i < order.length; i++) {
        var refund = await Refund.deleteMany({ "order": order[i]._id });
      }
    });
    res.status(200).json({
      message: "Deleted Successfull"
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.GetOrderPage = async (req, res) => {
  const items_page = 10;
  const page = req.query.page || 1;  // 2 page
  const w = req.query.id;
  try {
    let skip = (page - 1) * items_page;
    const order = await Order.count({ 'user_id': w });
    const items = await Order.find({ 'user_id': w }).limit(items_page).skip(skip).populate([
      {
        path: "customer",
        model: "Customer",
      },
      {
        path: "tax",
        model: "Tax",
      },
      {
        path: "product",
        model: "Products",
      },
    ]);
    let pageCount = order / items_page;
    let q = Math.round(Number.isInteger(pageCount) ? pageCount : pageCount);
    res.status(200).json({
      pagination: {
        order,
        skip,
        q,
      }, items
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}


// sales invoice
module.exports.GetInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.find({ user_id: req.query.id })
      .populate([
        {
          path: "customer",
          model: "Customer",
        },
        {
          path: "tax",
          model: "Tax",
        },
        {
          path: "user_id",
          model: "User"
        },
      ])
      .sort([["createdAt", "descending"]]);
    res.status(200).json(invoice);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports.GetInvoiceDashboard = async (req, res) => {
  try {
    const stock_inventory = await Stock_Inventory.find({ user_id: req.query.id });
    res.status(200).json(stock_inventory);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


exports.checkInvoice = async (req, res, next) => {
  const invoice_id = req.query.id;
  const received_money = req.query.recived_money;
  const invoice = await Invoice.findById(invoice_id);
  const amount_rec = invoice.received + parseInt(received_money);
  try {
    const Invoice_value = await Invoice.findByIdAndUpdate(
      { _id: invoice_id },
      {
        received: amount_rec,
      }
    );
    res.json({ message: Invoice_value })
  } catch (error) {
    console.log("Not Updated");
  }
};

function splitArray(array, chunkSize) {
  let result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}


module.exports.AddInvoice = async (req, res) => {
  console.log(req.query.data);
  try {
    const data = req.query.data;
    const invoice = await Invoice.create(req.body);
    const Array = data.split(',');
    let chunkSize = 9;
    let result = splitArray(Array, chunkSize);

    for (let i = 0; i < result.length; i++) {
      try {
        Invoice_Val.create(
          {
            user_id: invoice.user_id,
            invoice_value: invoice._id,
            ware_house_id: result[i][0],
            ware_house_name: result[i][1],
            product_inventory_id: result[i][2],
            product_inventory_name: result[i][3],
            quantity: result[i][4],
            price: result[i][5],
            amount: result[i][6],
            purchase_price: result[i][7],
            profit: result[i][8]
          }
        )
      } catch (error) {
        console.log("Not Updated");
      }
    }
    res.status(200).json({ result });

  } catch (error) {
    console.log(error);
  }
};



// Invoice_Val
exports.checkStock_Add = async (req, res, next) => {
  // const id= req.query.id;                //product_id
  // const quantity= req.query.quantity;    //quantity
  const id = req.query.id;
  const Array = id.split(',');
  let chunkSize = 9;
  let result = splitArray(Array, chunkSize);
  // console.log(result[1].length);


  try {
    for (let i = 0; i < result.length; i++) {
      let stock_Inventory = await Stock_Inventory.find({ "_id": result[i][2] });
      let stock_Inventory_value =
        await Stock_Inventory.findByIdAndUpdate(
          { _id: result[i][2] },
          {
            quantity: stock_Inventory[0].quantity - parseInt(result[i][4]),
            amount: stock_Inventory[0].price * parseInt(result[i][4])
          }
        );
    }
    res.status(200).json({ message: "Sucessfull" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }





};

exports.GetInvoicePage = async (req, res) => {
  const items_page = 10;
  const page = req.query.page || 1;  // 2 pagInvoice
  const w = req.query.id;

  try {
    // console.log(page+""+w);
    let skip = (page - 1) * items_page;
    // const qoutation = await Qoutation.findById(query);
    const invoice = await Invoice.count({ 'user_id': w });
    const items = await Invoice.find({ user_id: w })
      .limit(items_page)
      .skip(skip)
      .populate([
        {
          path: "customer",
          model: "Customer",
        },
        {
          path: "tax",
          model: "Tax",
        },
      ])
      .sort([["createdAt", "descending"]]);;
    let pageCount = invoice / items_page;
    let q = Math.round(Number.isInteger(pageCount) ? pageCount : pageCount + 0.75);
    res.status(200).json({
      pagination: {
        invoice,
        skip,
        q,
      }, items

    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


exports.GetInvoiceChallan = async (req, res) => {
  const id = req.query.id;
  try {
    const invoice = await Invoice.findById(id)
      .populate([
        {
          path: "customer",
          model: "Customer",
        },
        {
          path: "tax",
          model: "Tax",
        },
      ])
      .sort([["createdAt", "descending"]]);

    const invoice_val = await Invoice_Val.find({
      invoice_value: id,
    }).populate([
      {
        path: "ware_house_id",
        model: "Stock_Warehouse",
      },
      {
        path: "product_inventory_id",
        model: "Stock_Inventory",
      },
    ]);
    res
      .status(201)
      .json({ message: "Delivery Fetched Successfully", invoice, invoice_val });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};





exports.DeleteInvoice = async (req, res) => {
  try {
    const del = await Delivery.deleteMany({ invoice: req.query.id });
    const invoice = await Invoice.findByIdAndDelete({ "_id": req.query.id });
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
      let invoice = await Invoice.findByIdAndDelete({ "_id": entry });
    });
    res.status(200).json({
      message: "Deleted Successfull"
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};





// receivedmoney


module.exports.GetMoney = async (req, res) => {
  try {
    const receivedmoney = await Received.find({ "user_id": req.query.id }).populate([
      {
        path: "customer",
        model: "Customer",
      },
      {
        path: "tax",
        model: "Tax",
      },
    ]);
    res.status(200).json(receivedmoney);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


exports.GetMoneyPage = async (req, res) => {
  const items_page = 10;
  const page = req.query.page || 1;  // 2 pagInvoice
  const w = req.query.id;

  try {
    let skip = (page - 1) * items_page;
    const received = await Received.count({ 'user_id': w });
    const items = await Received.find({ 'user_id': w }).limit(items_page).skip(skip).populate([
      {
        path: "customer",
        model: "Customer",
      },
      {
        path: "tax",
        model: "Tax",
      },
    ]);
    let pageCount = received / items_page;
    let q = Math.round(Number.isInteger(pageCount) ? pageCount : pageCount + 0.75);
    res.status(200).json({
      pagination: {
        received,
        skip,
        q,
      }, items

    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.AddMoney = async (req, res, next) => {
  try {
    const receivedmoney = await Received.create(req.body);
    res.status(201).json(receivedmoney);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};



exports.DeleteMoney = async (req, res) => {
  try {
    // const customer = await Customer.deleteMany({});
    const receivedmoney = await Received.findByIdAndDelete({ "_id": req.query.id });
    res.json("Deleted Successfull");
  } catch (error) {
    res.json({ message: error.message });
  }
};


exports.DeleteMoneyArray = async (req, res) => {
  const id = req.query.id;
  try {
    const myArray = id.split(",");
    myArray.forEach(async (entry) => {
      let receivedmoney = await Received.findByIdAndDelete({ "id": entry });
    });
    res.status(200).json({
      message: "Deleted Successfull"
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};



//delivery

module.exports.Getdelivery = async (req, res) => {
  try {
    const delivery = await Delivery.find({ user_id: req.query.id })
      .populate([
        {
          path: "invoice",
          model: "Invoice",
          populate: [
            {
              path: "customer",
              model: "Customer",
            },
          ],
        },
        {
          path: "user_id",
          model: "User",
        },
      ])

    res.status(200).json(delivery);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


exports.Adddelivery = async (req, res, next) => {
  const { user_id, invoice, date, delivery_id, description, charges } = req.body
  const file = req.file ? req.file.filename : "-"
  try {
    const delivery = await Delivery.create({
      user_id,
      invoice,
      date,
      delivery_id,
      description,
      charges,
      attachment: file,
    });
    res.status(201).json({ delivery, message: "Delivery Added" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//GET DELIVERY BY ID FOR DELIVERY CHALLAN

exports.GetDeliveryChallan = async (req, res) => {
  const id = req.query.id
  try {
    const delivery = await Delivery.findById(id)
      .populate([
        {
          path: "invoice",
          model: "Invoice",
          populate: [
            {
              path: "customer",
              model: "Customer",
            },
          ],
        },
        {
          path: "user_id",
          model: "User",
        },
      ])
    const invoice_val = await Invoice_Val.find({
      invoice_value: delivery.invoice._id,
    }).populate([
      {
        path: "ware_house_id",
        model: "Stock_Warehouse",
      },
      {
        path: "product_inventory_id",
        model: "Stock_Inventory",
      },
    ]);
    res
      .status(201)
      .json({
        message: "Delivery Fetched Successfully",
        delivery,
        invoice_val,
      });
  }
  catch (error) {
    res.status(404).json({ message: error.message });
  }
}

exports.GetDeliveryPage = async (req, res) => {
  const items_page = 10;
  const page = req.query.page || 1;  // 2 page
  const w = req.query.id;
  try {
    let skip = (page - 1) * items_page;
    const delivery = await Delivery.count({ 'user_id': w });
    const items = await Delivery.find({ user_id: w })
      .limit(items_page)
      .skip(skip)
      .populate([
        {
          path: "invoice",
          model: "Invoice",
          populate: {
            path: "customer",
            model: "Customer",
          },
        },
      ])
      .sort([["createdAt", "descending"]]);;
    let pageCount = delivery / items_page;
    let q = Math.round(Number.isInteger(pageCount) ? pageCount : pageCount);
    res.status(200).json({
      pagination: {
        delivery,
        skip,
        q,
      }, items
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}


exports.DeleteDelivery = async (req, res, next) => {
  try {
    const delivery = await Delivery.findByIdAndDelete({ "_id": req.query.id });
    res.json("Deleted Successfull");
  } catch (error) {
    res.json({ message: error.message });
  }
}

exports.DeleteDeliveryArray = async (req, res) => {
  const id = req.query.id;
  try {
    const myArray = id.split(",");
    myArray.forEach(async (entry) => {
      let delivery = await Delivery.findByIdAndDelete({ "_id": entry });
    });
    res.status(200).json({
      message: "Deleted Successfull"
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Refund

module.exports.GetRefund = async (req, res) => {
  try {
    const refund = await Refund.find({ "user_id": req.query.id }).populate([
      {
        path: "customer",
        model: "Customer",
      },
      {
        path: "order",
        model: "Order",
      }
    ]);
    res.status(200).json(refund);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


exports.AddRefund = async (req, res, next) => {
  try {
    const refund = await Refund.create(req.body);
    res.status(201).json(refund);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};


exports.DeleteRefund = async (req, res, next) => {
  try {
    // const customer = await Customer.deleteMany({});
    const refund = await Refund.findByIdAndDelete({ "_id": req.query.id });
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
      let refund = await Refund.findByIdAndDelete({ "_id": entry });
    });
    res.status(200).json({
      message: "Deleted Successfull"
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


exports.GetRefundPage = async (req, res) => {
  const items_page = 10;
  const page = req.query.page || 1;  // 2 page
  const w = req.query.id;
  try {
    let skip = (page - 1) * items_page;
    const refund = await Refund.count({ 'user_id': w });
    const items = await Refund.find({ 'user_id': w }).limit(items_page).skip(skip).populate([
      {
        path: "order",
        model: "Order",
      },
      {
        path: "customer",
        model: "Customer",
      }
    ]);
    let pageCount = refund / items_page;
    let q = Math.round(Number.isInteger(pageCount) ? pageCount : pageCount);
    res.status(200).json({
      pagination: {
        refund,
        skip,
        q,
      }, items
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}



// Entries

exports.AddEntries = async (req, res, next) => {
  try {
    const entries = await Entries.create(req.body);
    res.status(201).json(entries);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};


module.exports.GetEntries = async (req, res) => {
  const w = req.query.id;
  try {
    const entries = await Entries.find({ 'user_id': w });
    res.status(200).json(entries);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


// dashboard working 

function getdate(date = new Date(), value) {

  const year = date.getFullYear();
  const getdate = new Date(date);
  var month = "";
  if (value == "current") {
    month = String(date.getMonth() + 1).padStart(2, '0');
    // console.log("Current Month" + month);
  } else if (value == "previous_month") {
    month = String(date.getMonth()).padStart(2, '0');
    // console.log("Previous Month" + month);
  } else if (value == "previous_secondmonth") {
    month = String(date.getMonth() - 1).padStart(2, '0');
  }
  const day = String(date.getDate()).padStart(2, '0');
  const full_date = [year, month, day].join('-');
  return full_date;
}



function getYear(val) {
  var now = new Date();
  var oneMonth = new Date();
  oneMonth.setYear(now.getFullYear() - val);
  const date = getdate(new Date(oneMonth.toString()), "current");
  return date;
}


module.exports.GetEntriesdashboard = async (req, res) => {
  // const items_page = 4 ;
  const date1 = new Date();
  const date2 = new Date();
  const dateyesterday = new Date();
  const currweek = new Date();
  const prevweek = new Date();
  const prevyear = new Date();
  const currentyear = new Date();
  const currentmonth = new Date();



  const w = req.query.id;  //for get user id

  try {

    const Arr = [];
    const a = getdate(new Date(date1), "previous_month");
    const b = getdate(new Date(date1), "current");
    const curr_month = await Entries.find({
      'date': {
        $gt: getdate(new Date(date1), "previous_month"),
        $lt: getdate(new Date(currentmonth.setDate(date1.getDate + 1)), "current")
      },
      'user_id': w
    });
    // const a = getdate(new Date(date1), "previous_secondmonth");
    // const b = getdate(new Date(date1), "previous_month");

    const prev_month = await Entries.find({
      'date': {
        $gt: getdate(new Date(date1), "previous_secondmonth"),
        $lt: getdate(new Date(date1), "previous_month")
      },
      'user_id': w
    });

    // getYear(3);
    const curr_year = await Entries.find({
      'date': {
        $gt: getYear(1),
        $lt: getYear(0)
      },
      'user_id': w
    });
    const prev_year = await Entries.find({
      'date': {
        $gt: getYear(2),
        $lt: getYear(1),
      },
      'user_id': w
    });





    const curr_week = await Entries.find({
      'date': {
        $gt: getdate(new Date(currweek.setDate(date1.getDate() - 7)), "current"),
        $lt: getdate(new Date(date2.setDate(date1.getDate() + 1)), "current")
      },
      'user_id': w
    });
    const prev_week = await Entries.find({
      'date': {
        $gt: getdate(new Date(currweek.setDate(currweek.getDate() - 7)), "current"),
        $lt: getdate(new Date(currweek.setDate(currweek.getDate() + 7)), "current"),
      },
      'user_id': w
    });


    // const x = getdate(new Date(dateyesterday.setDate(date1.getDate())), "current");
    const Today = curr_month.filter(employee => {
      return employee.date === getdate(new Date(date1), "current");;
    });

    const Yesterday = curr_month.filter(employee => {
      return employee.date === getdate(new Date(dateyesterday.setDate(date1.getDate() - 1)), "current");
    });
    // const Yesterday =  getdate(new Date(dateyesterday.setDate(date1.getDate() -1 )), "current");

    const q = getdate(new Date(date1), "current");
    const j = getdate(new Date(date1), "previous_month");


    res.status(200).json({
      Today,
      curr_week,
      Yesterday,
      prev_week,
      curr_year,
      prev_year,
      curr_month,
      prev_month
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};



exports.DeleteEntries = async (req, res) => {
  try {
    const Arr = [];
    const entries1 = await Entries.deleteMany({ "user_id": req.query.id, "order": req.query.value });


    res.status(201).json({ message: entries1 });

  } catch (error) {
    res.json({ message: error });
  }
};















