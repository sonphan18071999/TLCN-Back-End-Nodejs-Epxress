const db = require('../models/mainModels');
exports.AddUserAccount = async function (req, res, next) {
    const cpu = new db.userAccountModels({
        userName:req.body.userName,
        password: req.body.password,
        idUser:req.body.idUser
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
exports.checkAccount = async function(req,res,next){
   var chkUser = await db.userAccountModels.findOne({"userName":req.body.userName,"password":req.body.password});
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