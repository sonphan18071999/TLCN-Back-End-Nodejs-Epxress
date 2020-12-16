const { Mongoose } = require('mongoose');
const db = require('../models/mainModels');
exports.AddUserAccount = async function (req, res, next) {
  var checkEmail =  await db.userAccountModels.findOne({email:req.body.email});
  if(checkEmail){
    return res.status(500).json({"Message":"Email already used"});
  }else{
    var user = await db.userAccountModels.create(req.body);
    if(user){
      return res.status(200).json({
        "Message":"Create user successfully",
        "User":user
      })
    }else{
      return res.status(200).json({
        "Message":"Cant create new user",
        "Error":user
      })
    }
  }
}
exports.checkAccount = async function(  req,res,next){
  //1. Nếu kiểm tra user đăng nhập bằng facebook thì sẽ check lần đầu và mail.
 
  if(req.body.typeAccount=="facebook"){
    //Tìm email đó, nếu có là đã đăng ký rồi.
    await db.userAccountModels.findOne({email:req.body.email},(er,ok)=>{
      if(er){
        return res.status(500).json({
          message:"User doesn't exist"
      })
      }
      //Nếu thấy có email đó.
      if(ok){
        return res.status(200).json({
          message:"User does exist",
          user:ok
      })
      }else{
      //Email k tồn tại thì đăng ký mới.
      const userCreate = new db.userAccountModels({
        email: req.body.email,
        password: "ramdomize",
        name: req.body.userName,
        phone: "00000000",
        typeAccount: "facebook"
      })
      userCreate.save(function (errr) {
        if (errr) {
          res.status(500).json("Failed to account" +errr);
        }
        else
          res.status(200).json({
            message: "Success to create new account",
            user: userCreate
          });
      })
      }
    });
    
  }else if(req.body.typeAccount=="admin"){
    var chkUser = await db.userAccountModels.findOne({ email: req.body.email, password: req.body.password,typeAccount:req.body.typeAccount});
    if (chkUser) {
      return res.status(200).json({
        message: "User does exist",
        user: chkUser
      })
    } else {
     return res.status(500).json({
        message: "User doesn't exist"
      })
    }
  }
  if(req.body.typeAccount=="normal")
  {
    var chkUser = await db.userAccountModels.findOne({ email: req.body.email, password: req.body.password });
    if (chkUser) {
      return res.status(200).json({
        message: "User does exist",
        user: chkUser
      })
    } else {
      return res.status(500).json({
        message: "User doesn't exist"
      })
    }
  }
}
exports.findUserById = async (req,res,next)=> {
  var idUser = req.body.idUser;
  await db.userAccountModels.findOne({_id:idUser},(er,ok)=>{
    if(er){
      return res.status(500).json(
        {"Message":er}
      )
    }
    if(ok){
      return res.status(200).json({
        "Message":"Find user by id",
        "UserInfo":ok
      })
    }
  })
}
exports.getAllUser = async (req,res,next) =>{
  await db.userAccountModels.find((er,ok)=>{
    return res.status(200).json({
      "message":"Get all the user successfully",
      "AllUser":ok
    })
  })
}
