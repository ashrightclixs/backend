const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
// const AdminLogin = require("../models/user.model");
const Company = require("../models/compamy.model");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const fs = require("fs");


//Admin

const User_data = (User_ipaddress_data, User_ipaddress) => {
  var newArray = User_ipaddress_data.filter(function (item) {
    return User_ipaddress === item;
  });
  if (newArray) {
    return true;
  } else {
    return false;
  }
}


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

// router.route("/").get(async(req,res) => {
//    try {
//      const data = await User.find({ email: req.query.email });
//      res.status(200).json({ data });
//    } catch (err) {
//      res.status(404).json({ message: err.message });
//    }
// })

router.route("/login").post(async (req, res) => {
  const { email, password } = req.body;

  try {
    const { networkInterfaces } = require("os");

    function getIpAddress() {
      const interfaces = networkInterfaces();
      for (const interfaceName in interfaces) {
        const interface = interfaces[interfaceName];
        for (const address of interface) {
          if (address.family === "IPv4" && !address.internal) {
            return address.address;
          }
        }
      }
      return null; // no IPv4 address found
    }

    const ipAddress = getIpAddress();


    const existingUser = await User.findOne({ email });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!existingUser)
      return res.status(401).json({ message: "Invalid Email" });

    if (!isPasswordCorrect)
      return res.status(401).json({ message: "Invalid credentials" });
    
      if (existingUser.plan > 0) {

        if (existingUser.ip_addresss.length < existingUser.plan) {
  
          if (User_data(existingUser.ip_addresss, req.query.data)) {
  
           
  
            let user_value = await User.findByIdAndUpdate(
              { _id: existingUser._id },
              {
                $push: {
                  ip_addresss: {
                    "value": ipAddress
                  }
                }
              }
            );
    
  
          } else {
  
            return res.status(401).json({ message: "You are login from same device" });
  
          }
        } else {
  
          return res.status(401).json({ message: "USERS EXCEEDED :( . Please logout from other devices to login" });
        }
      }
      else {
  
        return res
          .status(401)
          .json({
            message:
              "Please recharge/ upgrade your plan. Contact +92 332 2027538",
          });
  
      }

    // console.log(existingUser._id);
    const token = existingUser.generateAuthToken();

    res
      .status(200)
      .json({
        result: existingUser,
        token,
        message: "Logged In successfully.",
        ip_address: ipAddress,
      });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." , error});
  }
});

router
  .route("/register")
  .post(upload.single("attachment"), async (req, res) => {
    const file = req.file.filename;
    const {
      username,
      email,
      password,
      region,
      isadmin,
      status,
      account_number,
      bank,
      current_date,
      due_date,
      plan,
      account_title,
    } = req.body;
 
    // res.status(200).json({ result: query.body });

    try {
      const existingUser = await User.findOne({ email });

      if (existingUser)
        return res
          .status(404)
          .json({ message: "User with this email already exist." });

      const hashedPassword = await bcrypt.hash(password, 12);

      const result = await User.create({
        email,
        attachment: file,
        password: hashedPassword,
        username,
        region,
        isadmin,
        status,
        image: "false",
        details: "No billing details set",
        superAdmin: false,
        account_number,
        bank,
        current_date,
        due_date,
        plan,
        account_title,
      });

      res.status(200).json({ result: result });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong.",
        error: error,
      });
    }
  });



router.route("/userupdate").post(async (req, res) => {

  const user_id = req.query.id;
  const current_date = req.query.current_date;
  const due_date = req.query.due_date;
  const plan = req.query.plan;
  const status = req.query.status;
  const isadmin = req.query.isAdmin;

  try {
    const user_value = await User.findByIdAndUpdate(
      { _id: user_id },
      {
        current_date: current_date,
        due_date: due_date,
        plan: plan,
        status: status,
        isadmin,
      }
    );
    res.json({ message: user_value })
  } catch (error) {
    console.log("Not Updated");
  }
});



router.route("/logout/update").get(async (req, res) => {

  const existingUser = await User.findById(req.query.id);

  const data_val = [];
  for( let i = 0 ; i < existingUser.ip_addresss.length ; i++){
    if(existingUser.ip_addresss[i].value != req.query.data){
      data_val.push(existingUser.ip_addresss[i]);
    }
  }

  console.log(data_val);
  User.findByIdAndUpdate(req.query.id)
  .then((exe) => {
    exe.ip_addresss = data_val;
    exe
      .save()
      .then(() => res.json(existingUser))
      .catch((err) => res.status((400).json("Error : " + err)));
  })
  .catch((err) => res.status((400).json("Error : " + err)));

 });


router.route("/update").post(upload.single("image"), async (req, res) => {
  const {
    username,
    email,
    password,
    details,
    bank,
    account_number,
    account_title,
  } = req.body;
  const existingUser = await User.findById(req.query.id);


  const existingEmail = await User.findOne({ email });
  if (
    existingEmail &&
    JSON.stringify({ a: existingUser }) !== JSON.stringify({ a: existingEmail })
  )
    return res.status(401).json({ message: "Email is Already in use" });


  const isPass = await bcrypt.compare(password, existingUser.password);
  const image = req.file ? req.file.filename : existingUser.image ? existingUser.image : "false";
  const path = `./images/${existingUser.image}`;
  if (req.file) {
    fs.unlink(path, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  }
  const hashedPassword = await bcrypt.hash(password, 12)
  User.findByIdAndUpdate(req.query.id)
    .then((exe) => {
      exe.username = username;
      isPass ? (exe.password = exe.password) : (exe.password = hashedPassword);
      exe.email = email;
      exe.image = image;
      exe.details = details;
      exe.bank = bank;
      exe.account_number = account_number;
      exe.account_title = account_title;
      exe
        .save()
        .then(() =>
          res.json({ message: "User Updated With Image", data: exe })
        )
        .catch((err) => res.status(400).json("Error : " + err));
    })
    .catch((err) => res.status(404).json("Error : " + err));
});


router.route("/getuser").get((req, res) => {
  User.find({}).sort([["createdAt", "descending"]])
    .then((resp) => res.status(200).json(resp))
    .catch((err) => res.status(404).json({ message: err.message }));
})


//GET USER
router.route("/get").get(async (req, res) => {
  try {
    const data = await User.find({ "_id": req.query.id })
    res.status(200).json({ data })

  } catch (err) {
    res.status(404).json({ message: err.message });

  }
})

// Delete Profile image

router.route("/delete_prof_img").post(async (req, res) => {
  const user = await User.findById(req.query.id)
  const path = `./images/${user.image}`;
  fs.unlink(path, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });

  try {
    user.image = "false";
    user.save()
    res.status(200).json({
      message: "user updated",
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      message: "Something went wrong.",
      error: error,
    });
  }
});


router.route("/get_company").get(async (req, res) => {
  const user_id = req.query.id

  try {
    const company = await Company.find({ user: user_id }).populate([
      {
        path: "user",
        model: "User"
      }
    ]);
    res.status(201).json({
      message: "Company already registered",
      data: company
    })
  } catch (error) {
    res.status(404).json({
      message: "Something went wrong",
      error
    })
  }
})



router.route("/post_company").post(upload.single("profile"), async (req, res) => {
  const user_id = req.query.id;
  const { name, owner, contact, email, niche, address } = req.body

  //SAME EMAIL ERROR HANDLING
  const existingCompany = await Company.findOne({ email })


  if (existingCompany) {
    return res
      .status(404)
      .json({ message: "Company with this email already exist." });
  }


  const company = await Company.find({ user: user_id });

  const profile = req.file
    ? req.file.filename
    : company.profile
      ? company.profile
      : "-";

  try {
    const create = await Company.create({
      name,
      owner,
      contact,
      email,
      niche,
      address,
      user: user_id,
      profile: profile,
    });

    res.status(200).json({
      message: "Company created",
      data: create,
      comp_profile : profile
    })
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong",
      error,
    });
  }
})




router
  .route("/update_company")
  .post(upload.single("profile"), async (req, res) => {
    const user_id = req.query.id;
    const { name, owner, contact, email, niche, address } = req.body;
    const company = await Company.find({ user: user_id });

    //SAME EMAIL ERROR HANDLING
    const existingCompany = await Company.findOne({ email });
    if (
      existingCompany &&
      JSON.stringify({ a: company[0]._id }) !== JSON.stringify({ a: existingCompany._id })
    )
      return res.status(401).json({ message: "Email is Already in use" });


    const profile = req.file
      ? req.file.filename
      : company[0].profile
        ? company[0].profile
        : "-"

    const path = `./images/${company[0].profile}`;

    if (req.file && company[0].profile !== "-") {
      fs.unlink(path, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    }

    Company.findByIdAndUpdate(req.query.company_id)
      .then((comp) => {
        comp.name = name;
        comp.owner = owner;
        comp.contact = contact;
        comp.email = email;
        comp.niche = niche;
        comp.address = address;
        comp.profile = profile;
        comp
          .save()
          .then(() =>
            res.json({
              message: "Company profile updated with image",
              data: comp,
              comp_profile : profile
            })
          )
          .catch((err) => res.status(400).json("Error : " + err));
      })
      .catch((e) => console.log(e));

  });



router.route("/delete_img").post(async (req, res) => {
  const company = await Company.findById(req.query.id);
  const path = `./images/${company.profile}`;
  fs.unlink(path, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });

  try {
    company.profile = "-";
    company.save();
    res.status(200).json({
      message: "company updated",
      data: company,
    });
  } catch (error) {
    res.status(404).json({
      message: "Something went wrong.",
      error: error,
    });
  }
});

//ROUTES FOR GET ALL USER

router.route("/getUsers").get(async (req, res) => {
  const email = req.query.email
  try {
    const user = await User.find({email})
    res.status(200).json({user})
  } catch (error) {
    res.status(404).json({message : error})
  }
  // METHOD 1
  // try {
  //   const users = await User.find()
  //   users.forEach(async (entry) => {
  //     let result = await User.findByIdAndUpdate(
  //       { _id: entry._id },
  //       {
  //         $set: {
  //           details: "No billing details set",
  //         },
  //       }
  //     );
  //   });
  //   res.status(200).json({ DATA: "users updated" });
  // } catch (error) {
  //   res.status(400).json({"Error" : error})
  // }

  // METHOD 2
  // const users = await User.find()
  // users.map((user) => {
  //   User.findByIdAndUpdate(user._id)
  //     .then((exe) => {
  //       exe.account_title = "-";
  //       exe
  //         .save()
  //         .then((resp) => resp.json({ message: "User Updated" }))
  //         .catch((err) => res.status(400).json("Error : " + err));
  //     })
  //     .catch((err) => res.status(400).json("Error : " + err));
  // })

  // const a = await User.find()
  // res.json({ a });
})

module.exports = router;
