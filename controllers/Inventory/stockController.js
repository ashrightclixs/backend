const AddStock = require("../../models/inventory/add_stock.model");
const AddstockAdj = require("../../models/inventory/add_stock_adj.model");
const StockWarehouse = require("../../models/inventory/stock_warehouse.model");
const Stock_Inventory = require("../../models/inventory/stock_inventory.model");
const StockMovement = require("../../models/inventory/stock_movement.model");
const Supplier = require("../../models/inventory/stock_supplier.model")


module.exports.GetStockMov = async (req, res) => {
  try {
    const addStock = await AddStock.find(req.body).populate([
      {
        path: "product",
        model: "Products",
      }
    ]);
    res.status(200).json(addStock);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.AddStockMov = async (req, res, next) => {
  try {
    const addStock = await AddStock.create(req.body);
    res.status(201).json(addStock);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

exports.DeleteStockMov = async (req, res) => {
  try {
    const addStock = await AddStock.findByIdAndDelete({ "_id": req.query.id });
    res.json("Deleted Successfull");
  } catch (error) {
    res.json({ message: error.message });
  }
};

exports.DeleteStockMovArray = async (req, res) => {
  const id = req.query.id;
  try {
    const myArray = id.split(",");
    myArray.forEach(async (entry) => {
      let addStock = await AddStock.findByIdAndDelete({ "_id": entry });
    });
    res.status(200).json({
      message: "Deleted Successfull"
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.GetStockMovPage = async (req, res) => {
  const items_page = 10;
  const page = req.query.page || 1;  // 2 page
  const w = req.query.id;
  try {
    let skip = (page - 1) * items_page;
    const addStock = await AddStock.count({ 'user_id': w });
    const items = await AddStock.find({ 'user_id': w }).limit(items_page).skip(skip)
      .populate([
        {
          path: "product",
          model: "Products",
        },
      ]);
    let pageCount = addStock / items_page;
    let q = Number.isInteger(pageCount) ? pageCount : pageCount;
    res.status(200).json({
      pagination: {
        addStock,
        skip,
        q,
      }, items

    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}



// StockAdj

module.exports.GetStockAdj = async (req, res) => {
  try {
    const addstockAdj = await AddstockAdj.find(req.body)
    res.status(200).json(addstockAdj);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.GetStockAdjPage = async (req, res) => {
  const items_page = 15;
  const page = req.query.page || 1;  // 2 page
  const w = req.query.id;
  try {
    let skip = (page - 1) * items_page;
    const addstockAdj = await AddstockAdj.count({ 'user_id': w });
    const items = await AddstockAdj.find({ user_id: w })
      .limit(items_page)
      .skip(skip)
      .populate([
        {
          path: "stock",
          model: "Stock_Inventory",
        },
      ]).sort([["createdAt", "descending"]]);
    let pageCount = addstockAdj / items_page;
    let q = Number.isInteger(pageCount) ? pageCount : pageCount;
    res.status(200).json({
      pagination: {
        addstockAdj,
        skip,
        q,
      }, items

    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

exports.AddStockAdj = async (req, res, next) => {
  const id = req.query.id; //product_id
  const quantity = req.query.quantity; //quantity
  try {
    const addstockAdj = await AddstockAdj.create(req.body);

    const stock_Inventory = await Stock_Inventory.find({ _id: id });
    const stock_Inventory_value = await Stock_Inventory.findByIdAndUpdate(
      { _id: id },
      {
        quantity: stock_Inventory[0].quantity + parseInt(quantity),
        amount: stock_Inventory[0].price * quantity,
      }
    );
    res.status(201).json(addstockAdj);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

exports.DeleteStockAdj = async (req, res) => {
  try {
    const addstockAdj = await AddstockAdj.findByIdAndDelete({ "_id": req.query.id });
    res.json("Deleted Successfull");
  } catch (error) {
    res.json({ message: error.message });
  }
};

exports.DeleteStockAdjArray = async (req, res) => {
  const id = req.query.id;
  try {
    const myArray = id.split(",");
    myArray.forEach(async (entry) => {
      let addstockAdj = await AddstockAdj.findByIdAndDelete({ "_id": entry });
    });
    res.status(200).json({
      message: "Deleted Successfull"
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


// stock_Warehouse

module.exports.GetStockWarehouse = async (req, res) => {
  const id = req.query.id;
  try {
    const stockwarehouse = await StockWarehouse.find({ "user_id": id });
    res.status(200).json(stockwarehouse);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.GetStockWarehousePage = async (req, res) => {
  const items_page = 10;
  const page = req.query.page || 1;  // 2 page
  const w = req.query.id;
  try {
    let skip = (page - 1) * items_page;
    const stockwarehouse = await StockWarehouse.count({ 'user_id': w });
    const items = await StockWarehouse.find({ 'user_id': w }).limit(items_page).skip(skip).sort([["createdAt", "descending"]]);;
    let pageCount = stockwarehouse / items_page;
    let q = Number.isInteger(pageCount) ? pageCount : pageCount;
    res.status(200).json({
      pagination: {
        stockwarehouse,
        skip,
        q,
      }, items

    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

exports.AddStockWarehousePage = async (req, res, next) => {
  try {
    const stockWarehouse = await StockWarehouse.create(req.body);
    res.status(201).json(stockWarehouse);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};



exports.GetWarehousePdf = async (req, res) => {
  const id = req.query.id;
  try {
    const inventory = await StockWarehouse.findById(id).populate([
      {
        path: "customer",
        model: "Customer",
      },
      {
        path: "ware_house",
        model: "Stock_Warehouse",
      },
      {
        path: "product_id",
        model: "Stock_Inventory",
      },
      {
        path: "tax",
        model: "Tax",
      },
    ]);
    res
      .status(201)
      .json({ message: "Delivery Fetched Successfully", invoice });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


// Stock_Inventory original

module.exports.GetStockInventory_value = async (req, res) => {
  const id = req.query.id;
  try {
    const stock_Inventory = await Stock_Inventory.find({ "_id": id }).populate([
      {
        path: "WareHouse",
        model: "Stock_Warehouse",
      },
    ]);
    res.status(200).json(stock_Inventory);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


module.exports.GetStockSupplier_value = async (req, res) => {
  const id = req.query.id;
  try {
    const stock_Inventory = await Stock_Inventory.find({ "Supplier": id }).populate([
      {
        path: "WareHouse",
        model: "Stock_Warehouse",
      },
    ]);
    res.status(200).json(stock_Inventory);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};





module.exports.GetStockInventory = async (req, res) => {
  const id = req.query.id;
  try {
    const stock_Inventory = await Stock_Inventory.find({ "user_id": id }).populate([
      {
        path: "WareHouse",
        model: "Stock_Warehouse",
      },
    ]);
    res.status(200).json(stock_Inventory);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports.GetInventory = async (req, res) => {
  const id = req.query.id;
  try {
    const stock_Inventory = await Stock_Inventory.findById(id).populate([
      {
        path: "WareHouse",
        model: "Stock_Warehouse",
      },
    ]);
    res.status(200).json(stock_Inventory);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports.GetStockInventoryfind = async (req, res) => {
  const id = req.query.id;
  try {
    const stock_Inventory = await Stock_Inventory.find({
      WareHouse: id,
    }).populate([
      {
        path: "WareHouse",
        model: "Stock_Warehouse",
      },
    ]);
    res.status(200).json(stock_Inventory);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


exports.GetStockInventoryPage = async (req, res) => {
  const items_page = 10;
  const page = req.query.page || 1;  // 2 page
  const w = req.query.id;
  try {
    let skip = (page - 1) * items_page;
    const stock_Inventory = await Stock_Inventory.count({ 'user_id': w });
    const items = await Stock_Inventory.find({ 'user_id': w }).limit(items_page).skip(skip).populate([
      {
        path: "WareHouse",
        model: "Stock_Warehouse",
      },
    ]);
    let pageCount = stock_Inventory / items_page;
    let q = Number.isInteger(pageCount) ? pageCount : pageCount;
    res.status(200).json({
      pagination: {
        stock_Inventory,
        skip,
        q,
      }, items

    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


exports.AddStockInventory = async (req, res, next) => {
  try {
    const stock_Inventory = await Stock_Inventory.create(req.body);
    res.status(201).json(stock_Inventory);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

module.exports.GetStockInventoryWarehouse = async (req, res) => {
  const warehouse_id = req.query.id;
  try {
    const stock_Inventory = await Stock_Inventory.find({ "WareHouse": warehouse_id }).populate([
      {
        path: "WareHouse",
        model: "Stock_Warehouse",
      },
    ]);
    res.status(200).json(stock_Inventory);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


// StockMovement

module.exports.GetStockMovement = async (req, res) => {
  const id = req.query.id;
  try {
    const stockMovement = await StockMovement.find({ "user_id": id }).populate([
      {
        path: "from_ware_house",
        model: "Stock_Warehouse",
      },
      {
        path: "to_ware_house",
        model: "Stock_Warehouse",
      },
      {
        path: "product_id",
        model: "Stock_Inventory"
      }
    ]);
    res.status(200).json(stockMovement);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.GetStockMovementPage = async (req, res) => {
  const items_page = 10;
  const page = req.query.page || 1;  // 2 page
  const w = req.query.id;
  try {
    let skip = (page - 1) * items_page;
    const stockMovement = await StockMovement.count({ 'user_id': w });
    const items = await StockMovement.find({ 'user_id': w }).limit(items_page).skip(skip).populate([
      {
        path: "from_ware_house",
        model: "Stock_Warehouse",
      },
      {
        path: "to_ware_house",
        model: "Stock_Warehouse",
      },
      {
        path: "product_id",
        model: "Stock_Inventory"
      }
    ]).sort([["createdAt", "descending"]]);
    let pageCount = stockMovement / items_page;
    let q = Number.isInteger(pageCount) ? pageCount : pageCount;
    res.status(200).json({
      pagination: {
        stockMovement,
        skip,
        q,
      }, items

    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.AddStockMovement = async (req, res, next) => {

  // const product = req.query.product;
  // const to_warehouse = req.query.to_warehouse;
  // const quantity = req.query.quantity;

  try {
    const stockMovement = await StockMovement.create(req.body);
    res.status(201).json(stockMovement);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

exports.checkStock_Add = async (req, res, next) => {
  const id = req.query.id;
  const user_id = req.query.user_id;
  const quantity = req.query.quantity;
  const warehouse = req.query.warehouse;
  try {
    const stock_Inventory = await Stock_Inventory.find({ "_id": id });
    const stock_Inventory_serial = await Stock_Inventory.find({ "user_id": user_id });
    console.log(stock_Inventory_serial.length +"" +warehouse);
    const stock_Inventory_value =
      await Stock_Inventory.findByIdAndUpdate(
        { _id: id },
        {
          quantity: stock_Inventory[0].quantity - quantity,
          amount: stock_Inventory[0].price * quantity
        }
      );
    stock_Inventory_value.save();
    const stock_Inventory_value_2 = await Stock_Inventory.create({
      user_id: stock_Inventory[0].user_id,
      Supplier: stock_Inventory[0].Supplier,
      stock_inventory: stock_Inventory_serial.length + 1000,
      stock_inventory_name: stock_Inventory[0].stock_inventory_name,
      sku: stock_Inventory[0].sku,
      date: stock_Inventory[0].date,
      currency: stock_Inventory[0].currency,
      WareHouse: warehouse,
      quantity: quantity,
      price: stock_Inventory[0].price,
      amount: quantity * stock_Inventory[0].price,
      comments: stock_Inventory[0].comments,
    });
    res.json({ message: stock_Inventory_value_2 })
  } catch (error) {
    console.log(error);
  }
};



// User.findByIdAndUpdate(req.query.id)
// .then((exe) => {
//   exe.username = username;
//   isPass ? (exe.password = exe.password) : (exe.password = hashedPassword); 
//   exe.email = email;
//   exe.image = image;
//   exe.details = details;
//     exe
//       .save()
//       .then(() =>
//         res.json({ message: "User Updated With Image", data: exe })
//       )
//       .catch((err) => res.status(400).json("Error : " + err));
// })
// .catch((err) => res.status(404).json("Error : " + err));










// Supplier
exports.GetSupplierPage = async (req, res) => {
  const items_page = 10;
  const page = req.query.page || 1; // 2 page
  const w = req.query.id;
  try {
    let skip = (page - 1) * items_page;
    const customer = await Supplier.count({ user_id: w });
    const items = await Supplier.find({ user_id: w })
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
      },
      items,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports.GetSupplier = async (req, res) => {
  try {
    const customer = await Supplier.find({ user_id: req.query.id }).sort([
      ["createdAt", "descending"],
    ]);
    res.status(201).json(customer);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.AddSupplier = async (req, res, next) => {
  try {
    const customer = await Supplier.create(req.body);
    res.status(201).json(customer);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};







