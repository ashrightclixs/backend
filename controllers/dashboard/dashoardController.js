const Stock_Inventory = require("../../models/inventory/stock_inventory.model");
const DashboardEntries = require("../../models/dashboard/dashbaord_entries.model");
const Invoice = require("../../models/invoice.model");
const DashboardRevenue = require("../../models/dashboard/revenue_expense.model");

//dashboard working 

// function getdate(value, condition) {
//     var dateObj = new Date();
//     if (condition == "month") {
//         dateObj.setMonth(dateObj.getMonth() - value);
//     } else if (condition == "year") {
//         dateObj.setYear(dateObj.getYear() - value);
//     } else {
//         dateObj.setDate(dateObj.getDate() - value);
//     }
//     const date = dateObj
//     const year = date.getFullYear();
//     const getdate = new Date(date);
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     const full_date = [year, month, day].join('-');
//     return full_date;
// }

// module.exports.GetdashboardInvoice = async (req, res) => {
//     const w = req.query.id;
//     // const items_page = 4 ;
//     try {

//         const curr_month = await DashboardEntries.find({
//             'date': {
//                 $gt: 2022-01-20 ,    //12-12-22
//                 $lt: 2023-12-20  //12-1-23
//             },
//             'user_id': w
//         });
//         const prev_month = await DashboardEntries.find({
//             'date': {
//                 $gt: getdate(2,"month"),//12-11-22
//                 $lt: getdate(1,"month") //12-12-22
//             },
//             'user_id': w
//         });
//         const curr_year = await DashboardEntries.find({
//             'date': {
//                 $gt: getdate(1,"year"),//12-01-22
//                 $lt: getdate(0,"year") //12-01-23
//             },
//             'user_id': w
//         });
//         const prev_year = await DashboardEntries.find({
//             'date': {
//                 $gt: getdate(2,"year"),//12-01-21
//                 $lt: getdate(1,"year") //12-01-22
//             },
//             'user_id': w
//         });
//         const Today = curr_month.filter(employee => {
//             return employee.date === getdate(0,"day");
//         });
//         const Yesterday = curr_month.filter(employee => {
//             return employee.date === getdate(1,"day");

//         });
//         const curr_week = await DashboardEntries.find({
//             'date': {
//                 $gt: getdate(7,"day"),    //12-12-22
//                 $lt: getdate(0,"day")     //12-1-23
//             },
//             'user_id': w
//         });
//         const prev_week = await DashboardEntries.find({
//             'date': {
//                 $gt: getdate(14,"day"),    //12-12-22
//                 $lt: getdate(7,"day")     //12-1-23
//             },
//             'user_id': w
//         });

//         res.status(200).json({
//             Today,
//             Yesterday,
//             curr_week,
//             prev_week,
//             curr_year,
//             prev_year,
//             curr_month,
//             prev_month
//         });
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// };

function getdate(date = new Date(), value) {
  
    const year = date.getFullYear();
    const getdate = new Date(date);
    var month = "";
    if (value == "current") {
      month = String(date.getMonth() + 1).padStart(2, '0');
      // console.log("Current Month" + month);
    } else if(value == "previous_month"){
      month = String(date.getMonth() ).padStart(2, '0');
      // console.log("Previous Month" + month);
    }else if(value == "previous_secondmonth"){
      month = String(date.getMonth() - 1).padStart(2, '0');
    }
    const day = String(date.getDate()).padStart(2, '0');
    const full_date = [year, month, day].join('-');
    return full_date;
  }
  
  
  
  function getYear(val){
    var now = new Date();
    var oneMonth = new Date();
    oneMonth.setYear(now.getFullYear() - val);
    const date = getdate(new Date(oneMonth.toString()),"current");
    console.log(now);
    return date;
  }
  
  
  module.exports.GetdashboardInvoice = async (req, res) => {
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
      const curr_month = await DashboardEntries.find({
        'date': {
          $gt: getdate(new Date(date1), "previous_month"),
          $lt: getdate(new Date(currentmonth.setDate(date1.getDate + 1)), "current")
        },
        'user_id': w
      });
      // const a = getdate(new Date(date1), "previous_secondmonth");
      // const b = getdate(new Date(date1), "previous_month");
  
      const prev_month = await DashboardEntries.find({
        'date': {
          $gt: getdate(new Date(date1), "previous_secondmonth"),
          $lt: getdate(new Date(date1), "previous_month")
        },
        'user_id': w
      });
  
      // getYear(3);
      const curr_year = await DashboardEntries.find({
        'date': {
          $gt: getYear(1),
          $lt: getYear(0)
        },
        'user_id': w
      });
      const prev_year = await DashboardEntries.find({
        'date': {
          $gt: getYear(2),
          $lt: getYear(1),
        },
        'user_id': w
      });
  
  
  
  
  
      const curr_week = await DashboardEntries.find({
        'date': {
          $gt: getdate(new Date(currweek.setDate(date1.getDate() - 7)), "current"),
          $lt: getdate(new Date(date2.setDate(date1.getDate() + 1)), "current")
        },
        'user_id': w
      });
      const prev_week = await DashboardEntries.find({
        'date': {
          $gt: getdate(new Date(currweek.setDate(currweek.getDate() - 7)), "current"),
          $lt: getdate(new Date(currweek.setDate(currweek.getDate() + 7)), "current"),
        },
        'user_id': w
      });
    
      
      // const x = getdate(new Date(dateyesterday.setDate(date1.getDate())), "current");
      const Today = curr_month.filter(employee => {
        return employee.date ===  getdate(new Date(date1), "current");;
      });
  
      const Yesterday = curr_month.filter(employee => {
        return employee.date === getdate(new Date(dateyesterday.setDate(date1.getDate() -1 )), "current");
      });
      // const Yesterday =  getdate(new Date(dateyesterday.setDate(date1.getDate() -1 )), "current");
  
      const q = getdate(new Date(date1), "current");
      const j =getdate(new Date(date1), "previous_month");
      
  
      
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

exports.Adddashboard = async (req, res, next) => {
    try {
      const dashboardEntries = await DashboardEntries.create(req.body);
      res.status(201).json(dashboardEntries);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
};

module.exports.Gedashboard = async (req, res) => {
    const w = req.query.id;
    try {
      const dashboardEntries = await DashboardEntries.find({ 'user_id': w });
      res.status(200).json(dashboardEntries);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
};



// DashboardRevenue
  

exports.AddDashboardRevenue = async (req, res, next) => {
  try {
    const dashboardrevenue = await DashboardRevenue.create(req.body);
    res.status(201).json(dashboardrevenue);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

module.exports.GeDashboardRevenue = async (req, res) => {
  const w = req.query.id;
  try {
    const dashboardrevenue = await DashboardRevenue.find({ 'user_id': w });
    res.status(200).json(dashboardrevenue);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};




//TOP PRODUCTS


module.exports.GetInvoiceDashboard = async (req, res) => {
  try {
      const Arr = [];
      // let q ;
      const stock_inventory = await Stock_Inventory.find({user_id:req.query.id});
      const data = stock_inventory.map((value,index)=>{
        return value._id;
      })
    const q = [];
    //  countDocuments
      for(let i = 0 ; i < data.length ; i++){
        // q[i] = await Invoice.find({user_id:req.query.id}).select({product_id:data[i]}).countDocuments();
        q[i] = await Invoice.countDocuments({product_id:data[i]});
        Arr.push([q[i],data[i]]);
      }
      // console.log(Arr[1][0]);
      const temp = [];
      for (let i = 0; i < Arr.length ; i++) {
        for(let j = i + 1 ;j < Arr.length ;j++){
          if(Arr[i][0] < Arr[j][0]){
            temp[i] = Arr[i];    
            Arr[i] = Arr[j];    
            Arr[j] = temp[i];    
          }
        } 
      }
      let stock_inventory_value = [];
      if(Arr.length > 0){
        for (let i = 0; i < Arr.length; i++) {
          stock_inventory_value.push(
            await Stock_Inventory.find({ _id: Arr[i][1] }).populate([
              {
                path: "WareHouse",
                model: "Stock_Warehouse",
              },
            ])
          );
        }
      }

      res.status(200).json({
        inventory_id: {
          data
        },
        count_inventory : {
          Arr
        },
        stock_inventory_1:{
          stock_inventory_value
        }
      });
      
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
};
  
