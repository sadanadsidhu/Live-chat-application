// const Users=require("../models/userModel")
// const bcrypt=require("bcrypt");

// module.exports.register= async(req, res, next)=>{
//     console.log("req....",req);
// try{
//     const {username, email ,password  }=req.body;
// const usernameCheck=await Users.findOne({username});
// if(usernameCheck)
// return res.json({ msg:"Username already used",status:false });
// const emailCheck=await Users.findOne({ email });
// if(emailCheck)
// return res.json({ msg:"Email already used",status:false });
// const hashedPassword=await bcrypt.hash(password,10);
// const user =await Users.create({
//     username,
//     email,
//     password:hashedPassword,
// });
// delete user.password;
// return res.json({ status:true, user });
// }catch(ex){
//     next(ex);
// }
// console.log("user...",user)
// };
// const Users = require("../models/userModel");
// const bcrypt = require("bcrypt");
// module.exports.register = async (req, res, next) => {
//     try {
//       const { username, email, password } = req.body;
//       const usernameCheck = await Users.findOne({ username });
//       if (usernameCheck)
//         return res.json({ msg: "Username already used", status: false });
//       const emailCheck = await Users.findOne({ email });
//       if (emailCheck)
//         return res.json({ msg: "Email already used", status: false });
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const user = await Users.create({
//         email,
//         username,
//         password: hashedPassword,
//       });
//       delete user.password;
//       return res.json({ status: true, user });
//     } catch (ex) {
//       next(ex);
//     }
//   };
const Users = require("../models/userModel");

//create main Model
// const Users = db.users;

async function register(req, res) {
  const { username, email, password } = req.body;

  try {
    // Create a new user record in the database
    const newUser = await Users.create({
      username,
      email,
      password,
    });

    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
module.exports = { register };
