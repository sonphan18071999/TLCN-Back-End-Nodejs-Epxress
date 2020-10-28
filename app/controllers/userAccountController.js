const db = require('../models/mainModels');
exports.AddUserAccount = async function (req, res, next) {
   await db.userAccountModels.findOne({email:req.body.email},(er,ok)=>{
    if(er){
      res.status(500).json({
        "Message":"Fail to create account"
      })
    }
    if(ok){
      res.status(500).json({
        "Message":"Fail to create account"
      })
    }else{
      const cpu = new db.userAccountModels({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        phone: req.body.phone,
        typeAccount: req.body.typeAccount
      })
      cpu.save(function (errr) {
        if (errr) {
          res.status(500).json("Failed to account" +errr);
        }
        else
          res.status(200).json({
            message: "Success to create new account",
            cpu: cpu
          });
      })
    }
    })
}
exports.checkAccount = async function(req,res,next){
   var chkUser = await db.userAccountModels.findOne({email:req.body.email,password:req.body.password});
   if(chkUser){
    return res.status(200).json({
          message:"User does exist"
      })
   }else{
    res.status(500).json({
            message:"User doesn't exist"
        })
   }
}