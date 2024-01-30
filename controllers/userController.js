// const { User, validate } = require("../models/user.model");
// import bcrypt from "bcrypt";
// import Joi from "joi"


// //SIGN IN VALIDATION

// const validate = (data) => {
//   const schema = Joi.object({
//     email : Joi.string().email().required(),
//     password : Joi.string().required()
//   })

//   return schema.validate(data)
// }
// export const signin = async (req, res) => {
//   const { email, password } = req.body;
//   const { error } = validate(req.body)

//   if (error) return res.status(400).send({message : error.details[0].message})

//   try {
//     const existingUser = await User.findOne({ email });

//     if (!existingUser)
//       return res.status(401).json({ message: "Invalid Email" });

//     const isPasswordCorrect = await bcrypt.compare(
//       password,
//       existingUser.password
//     );

//     if (!isPasswordCorrect)
//       return res.status(401).json({ message: "Invalid credentials" });

//     const token = user.generateAuthToken()

//     res
//       .status(200)
//       .json({ result: existingUser, token, message: "Logged In successfully." });
//   } catch (error) {
//     res.status(500).json({ message: "Something went wrong." });
//   }
// };

// export const signup = async (req, res) => {
//   const { name, email, password, region } = req.body;

//   const {error} = validate(password)

//   if (error) return res.status(400).send({message : error.details[0].message})
    
//   try {
//     const existingUser = await User.findOne({ email });

//     if (existingUser)
//       return res.status(404).json({ message: "User already exist." });

//     const hashedPassword = await bcrypt.hash(password, 12);

//     const result = await User.create({
//       email,
//       password: hashedPassword,
//       name,
//       region,
//     });

//     res.status(200).json({ result: result });
//   } catch (error) {
//     res.status(500).json({ message: "Something went wrong." });
//   }
// };
