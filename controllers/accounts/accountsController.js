// expense
const AccountType = require("../../models/account_models/account_type.model");
const AccountParent = require("../../models/account_models/account_parent.model");
const Expense = require("../../models/account_models/expense_models/expense.model");
const BankAccount = require("../../models/Account/bank_account.model");
const Add_Expense = require("../../models/Account/add_expense.model");
const Add_Funds = require("../../models/Account/funds_account.model");
const JournalEntry = require("../../models/Account/add_j_entry.model");
const Add_CashDeposit = require("../../models/Account/add_cashdeposit");
const Invoice = require("../../models/invoice.model");
const PurchaseInvoice = require("../../models/purchase_models/invoice.model");







exports.GetExpense = async (req, res) => {
  try {
    const expense = await Expense.find({ "user_id": req.query.id })
      .populate([
        {
          path: "tax",
          model: "Tax",
        },
        {
          path: "expense_type",
          model: "AccountType",
        },
        {
          path: "payfrom",
          model: "AccountType",
        },
      ]);
    res.status(200).json(expense);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.AddExpense = async (req, res, next) => {
  try {
    const expense = await Expense.create(req.body);
    res.status(201).json(expense);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

exports.DeleteExpense = async (req, res) => {

  const w = req.query.id;
  try {
    const expense = await Expense.findByIdAndDelete({ "_id": w });
    res.status(201).json({ message: expense });

  } catch (error) {
    res.json({ message: error });
  }
};


// account type AccountParent

exports.GetAccountType = async (req, res) => {
  try {
    const accountType = await AccountType.find({ "user_id": req.query.id })
      .populate([
        {
          path: "account_type",
          model: "AccountParent",
        },
      ]);
    res.status(200).json(accountType);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.AddAccountType = async (req, res, next) => {
  try {
    const accountType = await AccountType.create(req.body);
    res.status(201).json(accountType);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

exports.DeleteAccountType = async (req, res) => {

  const w = req.query.id;
  try {
    const accountType = await AccountType.findByIdAndDelete({ "_id": w });
    res.status(201).json({ message: accountType });

  } catch (error) {
    res.json({ message: error });
  }
};


// AccountParent

exports.GetAccountParent = async (req, res) => {
  try {
    const accountParent = await AccountParent.find({ "user_id": req.query.id })
    res.status(200).json(accountParent);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.AddAccountParent = async (req, res, next) => {
  AccountParent
  try {
    const accountParent = await AccountParent.create(req.body);
    res.status(201).json(accountParent);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

exports.DeleteAccountParent = async (req, res) => {

  const w = req.query.id;
  try {
    const accountParent = await AccountParent.findByIdAndDelete({ "_id": w });
    res.status(201).json({ message: accountParent });

  } catch (error) {
    res.json({ message: error });
  }
};



//BankAccount


exports.GetBankAccount = async (req, res) => {
  try {
    const bankAccount = await BankAccount.find({ "user_id": req.query.id })
    res.status(200).json(bankAccount);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


exports.AddBankAccount = async (req, res, next) => {
  try {
    const bankAccount = await BankAccount.create(req.body);
    res.status(201).json(bankAccount);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};


exports.DeleteBankAccount = async (req, res) => {
  const w = req.query.id;
  try {
    const bankAccount = await BankAccount.findByIdAndDelete({ "_id": w });
    res.status(201).json({ message: bankAccount });

  } catch (error) {
    res.json({ message: error });
  }
};


exports.checkBank = async (req, res, next) => {
  const bankaccount_id= req.query.id;
  const money= req.query.amount;

  const bankAccount_value = await BankAccount.findById(bankaccount_id);
    try {
      const bankAccount = await BankAccount.findByIdAndUpdate(
        { _id: bankaccount_id },
        {
          amount: money,
        }
      );
      res.json({ message:  bankAccount_value })
  } catch (error) {
      console.log("Not Updated");
  }
};



exports.GetBankAccountPage = async (req, res) => {
  const items_page = 10;
  const page = req.query.page || 1;  // 2 page
  const w = req.query.id;
  try {
    // console.log(page+""+w);
    let skip = (page - 1) * items_page;
    // const qoutation = await Qoutation.findById(query);
    const bankAccount = await BankAccount.count({ 'user_id': w });
    const items = await BankAccount.find({ 'user_id': w }).limit(items_page).skip(skip).sort([["createdAt", "descending"]]);
    let pageCount = bankAccount / items_page;
    let q = Number.isInteger(pageCount) ? pageCount : pageCount;
    res.status(200).json({
      pagination: {
        bankAccount,
        skip,
        q,
      }, items

    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


// Add_Expense

exports.GetAdd_Expense = async (req, res) => {
  try {
    const add_Expense = await Add_Expense.find({ "user_id": req.query.id })
    res.status(200).json(add_Expense);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


exports.AddAdd_Expense = async (req, res, next) => {
  try {
    const add_Expense = await Add_Expense.create(req.body);

    res.status(201).json(add_Expense);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};


exports.DeleteAdd_Expense = async (req, res) => {
  const w = req.query.id;
  try {
    const add_Expense = await Add_Expense.findByIdAndDelete({ "_id": w });
    res.status(201).json({ message: add_Expense });

  } catch (error) {
    res.json({ message: error });
  }
};


exports.GetAdd_ExpensePage = async (req, res) => {
  const items_page = 10;
  const page = req.query.page || 1;  // 2 page
  const w = req.query.id;
  try {
    // console.log(page+""+w);
    let skip = (page - 1) * items_page;
    // const qoutation = await Qoutation.findById(query);
    const add_Expense = await Add_Expense.count({ 'user_id': w });
    const items = await Add_Expense.find({ 'user_id': w }).limit(items_page).skip(skip)
     .sort([["createdAt", "descending"]]);
    let pageCount = add_Expense / items_page;
    let q = Number.isInteger(pageCount) ? pageCount : pageCount;
    res.status(200).json({
      pagination: {
        add_Expense,
        skip,
        q,
      }, items

    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


//Add_Funds 

exports.GetAdd_Funds = async (req, res) => {
  try {
    const add_Funds = await Add_Funds.find({ "user_id": req.query.id });
    res.status(200).json(add_Funds);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


exports.Add_Add_Funds = async (req, res, next) => {
  try {
    const Add_Fundsdd_Funds = await Add_Funds.create(req.body);

    res.status(201).json(Add_Fundsdd_Funds);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};


exports.DeleteAdd_Funds = async (req, res) => {
  const w = req.query.id;
  try {
    const add_Funds = await Add_Funds.findByIdAndDelete({ "_id": w });
    res.status(201).json({ message: add_Funds });

  } catch (error) {
    res.json({ message: error });
  }
};


exports.GetAdd_FundsPage = async (req, res) => {
  const items_page = 10;
  const page = req.query.page || 1;  // 2 page
  const w = req.query.id;
  try {
    // console.log(page+""+w);
    let skip = (page - 1) * items_page;
    const add_Funds = await Add_Funds.count({ 'user_id': w });
    const items = await Add_Funds.find({ 'user_id': w }).limit(items_page).skip(skip).sort([["createdAt", "descending"]]);;
    let pageCount = add_Funds / items_page;
    let q = Number.isInteger(pageCount) ? pageCount : pageCount;
    res.status(200).json({
      pagination: {
        add_Funds,
        skip,
        q,
      }, items

    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};







// JournalEntry


exports.GetJournalEntry = async (req, res) => {
  try {
    const journal_entry = await JournalEntry.find({ "user_id": req.query.id });
    res.status(200).json(journal_entry);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


exports.Add_JournalEntry = async (req, res, next) => {
  try {
    const journal_entry = await JournalEntry.create(req.body);

    res.status(201).json(journal_entry);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};


exports.DeleteJournalEntry = async (req, res) => {
  const w = req.query.id;
  try {
    const journal_entry = await JournalEntry.findByIdAndDelete({ "_id": w });
    res.status(201).json({ message: journal_entry });

  } catch (error) {
    res.json({ message: error });
  }
};


exports.GetJournalEntryPage = async (req, res) => {
  const items_page = 10;
  const page = req.query.page || 1;  // 2 page
  const w = req.query.id;
  try {

    let skip = (page - 1) * items_page;
    const journal_entry = await JournalEntry.count({ 'user_id': w });
    const items = await JournalEntry.find({ 'user_id': w }).limit(items_page).skip(skip).sort([["createdAt", "descending"]]);;
    let pageCount = journal_entry / items_page;
    let q = Number.isInteger(pageCount) ? pageCount : pageCount;
    res.status(200).json({
      pagination: {
        journal_entry,
        skip,
        q,
      }, items

    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


// Add_CashDeposit

exports.GetAdd_CashDeposit = async (req, res) => {
  try {
    const add_CashDeposit = await Add_CashDeposit.find({ "user_id": req.query.id });
    res.status(200).json(add_CashDeposit);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


exports.Add_Add_CashDeposit = async (req, res, next) => {
  try {
    const add_CashDeposit = await Add_CashDeposit.create(req.body);
    res.status(201).json(add_CashDeposit);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};


exports.GetAdd_CashDepositPage = async (req, res) => {
  const items_page = 10;
  const page = req.query.page || 1;  // 2 page
  const w = req.query.id;
  try {

    let skip = (page - 1) * items_page;
    const add_CashDeposit = await Add_CashDeposit.count({ 'user_id': w });
    const items = await Add_CashDeposit.find({ 'user_id': w }).limit(items_page).skip(skip).sort([["createdAt", "descending"]]);
    let pageCount = add_CashDeposit / items_page;
    let q = Number.isInteger(pageCount) ? pageCount : pageCount;
    res.status(200).json({
      pagination: {
        add_CashDeposit,
        skip,
        q,
      }, items

    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


// let month_value = "April"
// let year_value = '2022'
// const d = new Date(`${year_value}-${month_value}-01`);
// let month = d.getMonth();
// let year = d.getYear();
// console.log( year)

function getdate(date) {
  const year = date.getFullYear();
  const getdate = new Date(date);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const full_date = [year, month, day].join('-');
  return full_date;
}


exports.GetTrialBalance = async (req, res) => {
  try {
    var date 
    var current_Date 
    var previous_Date  

    if (req.query.month == "13") {
      date = (`${req.query.year}-1-1`);
      current_Date = getdate(new Date(date)); //first day of month
      previous_Date = getdate(new Date(req.query.year, 6, 0)); //last day of month
    } 
    else if(req.query.month == "14"){
      date = (`${req.query.year}-1-1`);
      current_Date = getdate(new Date(date)); //first day of month
      previous_Date = getdate(new Date(req.query.year, 12, 0)); //last day of month
    }
    else {
      date = (`${req.query.year}-${req.query.month}-1`);
      current_Date = getdate(new Date(date)); //first day of month
      previous_Date = getdate(new Date(req.query.year, req.query.month, 0)); //last day of month
    }
    
    //debit
    let capital_ac = 0;
    let sales_ac = 0;
    let receivable_ac = 0;

    //credit
    let purchase_ac = 0;
    let expenses_ac = 0;
    let payable_ac = 0;



    const add_CashDeposit = await Add_CashDeposit.find({
      'date': {
        $gt: current_Date,    // last day
        $lt: previous_Date      // first day
      },
      'user_id': req.query.id
    });  // capital a/c  

    const add_sales = await Invoice.find({
      'curr_date': {
        $gt: current_Date,    // last day
        $lt: previous_Date      // first day
      },
      'user_id': req.query.id
    });   // a/c sales  (invoicedatabase)  a/c receivable  (invoicedatabase)

    // credit
    const purchase_Invoice = await PurchaseInvoice.find({
      'curr_date': {
        $gt: current_Date,    // last day
        $lt: previous_Date      // first day
      },
      'user_id': req.query.id
    });  // a/c payable purchase a / c  (purchaseinvoicedatabase)

    const add_Expense = await Add_Expense.find({
      'date': {
        $gt: current_Date,    // last day
        $lt: previous_Date      // first day
      },
      'user_id': req.query.id
    });  // a/c expense  (purchaseinvoicedatabase)

    // for( let i =0 ; i < add_CashDeposit.length - 1 ; i++){
    //   capital_ac += add_CashDeposit.amount;
    // }

    add_CashDeposit.map((value, index) => {
      capital_ac += value.amount;
    })

    add_sales.map((value, index) => {
      sales_ac += value.net;
      receivable_ac += value.net - value.received;
    })

    purchase_Invoice.map((value, index) => {
      purchase_ac += value.net;
      payable_ac += value.net - value.received;
    })

    add_Expense.map((value, index) => {
      expenses_ac += value.amount;
    })

    let total_debit = capital_ac + sales_ac + receivable_ac;
    let total_credit = purchase_ac + payable_ac + expenses_ac;
    let total = 0 ;
    let entires = "";
    let cash = 0;
    if(total_debit > total_credit){
      total = total_debit;
      cash = total_debit - total_credit ;
      entires = "credit";
    }else{
      total = total_credit;
      cash = total_credit - total_debit;
      entires = "debit";
    }
    
    res.status(200).json({
      // current_Date,
      // previous_Date,

      capital_ac,
      sales_ac,
      receivable_ac,
      cash,
      entires,
      total,
      total_debit,
      total_credit,
      capital_ac,
      sales_ac,
      receivable_ac,
      purchase_ac,
      payable_ac,
      expenses_ac,

      // add_Expense,
      // add_CashDeposit,
      // add_sales,
      // purchase_Invoice,
      // add_Expense,
      // current_Date, previous_Date

    });


  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};





