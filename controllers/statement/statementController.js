const Invoice = require("../../models/invoice.model");
const DashboardRevenue = require("../../models/dashboard/revenue_expense.model");
const Expense = require("../../models/Account/add_expense.model");


module.exports.GetIncomeStatement = async (req, res) => {
    try {
        //Net Sales
        const invoice = await Invoice.find({
            'curr_date': {
                $gt: req.query.previous,
                $lt: req.query.current
            },
            'user_id': req.query.id
        });

        //Gross Profit
        const dashboardrevenue = await DashboardRevenue.find({
            'date': {
                $gt: req.query.previous,
                $lt: req.query.current
            },
            'user_id': req.query.id,
        });

        //Expense
        const expense = await Expense.find({
            'date': {
                $gt: req.query.previous,
                $lt: req.query.current
            },
            'user_id': req.query.id
        });

        const Array_data = [
            "Salaries Expense",
            "Electricity Expense",
            "Water Expense",
            "Gas Expense",
            "Office Rental Expense",
            "Repairing and Maintenance",
            "Delivery Expense",
            "Stationery Expense",
            "Internet Bill",
            "Other Expense"
        ]
        const Array_expense = [];

        for( let  i = 0 ; i < Array_data.length  ; i++ ){
            Array_expense.push(expense.filter(val => {
                return val.expense_account == Array_data[i];
            }));
        }
        
        res.status(200).json({
            invoice,
            dashboardrevenue,
            Array_expense,
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


// .populate([
//     {
//       path: "customer",
//       model: "Customer",
//     },
//     {
//       path: "tax",
//       model: "Tax",
//     },
//     {
//       path: "product_id",
//       model: "Stock_Inventory",
//     },
// ]);