const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose");

require("dotenv").config()

const app = express()

const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

//To Access Images Folder

app.use("/images", express.static("images"))

// ____**____

const uri = process.env.ATLAS_URI
mongoose.connect(uri)

const connection = mongoose.connection

connection.once("open" , () => {
    console.log("MongoDB database connection established successfully")
})

const quotation = require('./routes/qoutation.routes');
const customer = require('./routes/customer.routes');
const tax = require("./routes/tax.routes");
const user = require("./routes/user.routes");
const order =require("./routes/order.routes");
const invoice =require("./routes/invoice.routes");
const received =require("./routes/receivedmoney.routes");
const delivery =require("./routes/delivery.routes");
const refund =require("./routes/refund.routes");
const entries =require("./routes/entries.routes");
const purchase_order =require("./routes/Purchase/order.routes");
const purchase_invoice =require("./routes/Purchase/invoice.routes");
const purchase_return =require("./routes/Purchase/refund.routes");
const products =require("./routes/Purchase/products.routes");
const add_stock_mov =require("./routes/Inventory/add_stock.routes");
const stock_warehouse =require("./routes/Inventory/stock_warehouse.routes");
const stock_movement =require("./routes/Inventory/stock_movement.routes");
const add_stock_adj =require("./routes/Inventory/add_stock_adj.routes");
const Stock_Inventory =require("./routes/Inventory/stock_inventory.routes");
const Stock_Supplier = require("./routes/Inventory/stock_supplier.routes");
const add_expense =require("./routes/account/Expense/expense.routes");
const accountParent =require("./routes/account/account_parent.routes");
const account_type =require("./routes/account/expense_type.routes");
const bank_account =require("./routes/account_model/bank_account.routes");
const add_Expense =require("./routes/account_model/expense.routes");
const add_Funds =require("./routes/account_model/funds_account.routes");
const journal_entry =require("./routes/account_model/j_entry.routes");
const dashbaord_entries =require("./routes/dashboard/dashboard.routes");

const DashboardRevenue =require("./routes/dashboard/DashboardRevenue.routes");

const StatementIncome =require("./routes/Statement/incomestatement.routes");

const CashDeposit =require("./routes/account_model/cashdeposit.routes")

// const deleteCollection = require("./routes/delete.routes")





// sales
app.use("/qoutation" , quotation);
app.use("/customer", customer);
app.use("/tax", tax);
app.use("/user", user);
app.use("/sales/order",order);
app.use("/sales/invoice",invoice);
app.use("/sales/received",received);
app.use("/sales/delivery",delivery);
app.use("/sales/refund",refund);
app.use("/sales/entries",entries);




// purchase
app.use("/purchase/order",purchase_order);
app.use("/purchase/invoice",purchase_invoice);
app.use("/purchase/return",purchase_return);
app.use("/products",products);



//inventory
app.use("/inventory/stock_mov",add_stock_mov);
app.use("/inventory/stock_adj",add_stock_adj);
app.use("/inventory/stock_warehouse",stock_warehouse);
app.use("/inventory/stock_inventory",Stock_Inventory);
app.use("/inventory/stock_supplier", Stock_Supplier);
app.use("/inventory/stock_movement",stock_movement);



// accounts
app.use("/accounts/accountParent",accountParent);
app.use("/accounts/accountType",account_type);
app.use("/accounts/bank_account",bank_account);
app.use("/accounts/add_Expense",add_Expense);
app.use("/accounts/funds_account",add_Funds);
app.use("/accounts/cash_deposit",CashDeposit);
app.use("/accounts/journal_entry",journal_entry);



// add_expense
app.use("/accounts/expense",add_expense);

//statement  
// StatementIncome
app.use("/statement/incomestatement", StatementIncome);

//dashbaord_entries
// DashboardRevenue
app.use("/dashboard/dashbaord_entries",dashbaord_entries);
app.use("/dashboard/dashboard_revenue",DashboardRevenue);

// app.use("/deleteCollection", deleteCollection);



app.listen(port , () => {
    console.log(`server is running on Port : ${port}`)
})